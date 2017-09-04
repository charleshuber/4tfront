import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import { Resource } from './resource';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export abstract class ResourceService<R extends Resource> {

    private domain = 'http://localhost:8080/';
    //private domain = '/';
    private servicesUrl = this.domain + '4TRest/services/';
    private resourcesUrl = this.servicesUrl + 'resources';  // URL to web API

    constructor(protected http: Http, protected authService: AuthenticationService) { }

    public getAll(): Observable<R[] | any> {
        return this.authenticate('get', this.getResourceUrl() + '/all', null, null);
    }

    public create(resource: R): Observable<R | any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });
        return this.authenticate('post', this.getResourceUrl(), resource, options);
    }

    public read(id: number): Observable<R | any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + id, null, null);
    }

    public update(resource: R): Observable<R | any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers });
        return this.authenticate('put', this.getResourceUrl(), resource, options);
    }

    public delete(id: number): Observable<R[] | any> {
        let headers = new Headers();
        let options = new RequestOptions({ headers });
        return this.authenticate('delete', this.getResourceUrl() + '/' + id, null, null);
    }

    private authenticate(method, url, resource, options) {
        let service = this;
        let authentication = this.authService.authenticate(this.servicesUrl);
        return Observable.create(obs => {
            authentication.subscribe(function(authorization) {
                if (!options) {
                    options = options = new RequestOptions();
                }
                if (!options.headers) {
                    options.headers = new Headers();
                }
                options.headers.append('Authorization', authorization);

                let httpRequest = null;
                if (resource) {
                    httpRequest = service.http[method](url, resource, options)
                        .map(service.extractData)
                        .catch(service.handleError);
                } else {
                    httpRequest = service.http[method](url, options)
                      .map(service.extractData)
                      .catch(service.handleError);
                }
                httpRequest.subscribe(
                    data => {
                        obs._next(data);
                    },
                    e => obs._error(e),
                    () => obs._complete());
            },
            e => obs._error(e),
            () => obs._complete());
        });
    }

    protected getRootResourceUrl() {
        return this.resourcesUrl;
    }

    protected abstract getResourceUrl();

    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    protected handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if (error.headers.has('validation-failed')) {
                return Observable.throw(error.json());
            }
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
