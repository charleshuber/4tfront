import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceService } from '../resource.service';
import { Timeline } from './timeline';

@Injectable()
export class TimelineService extends ResourceService<Timeline> {

    public addCPPR(tlId: number, cpprId: number): Observable<any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/add/compiledPeriod/' + cpprId, null, null);
    }

    public removeCPPR(tlId: number, cpprId: number): Observable<any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/remove/compiledPeriod/' + cpprId + '', null, null);
    }

    public addCRPR(tlId: number, crprId: number): Observable<any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/add/cronPeriod/' + crprId, null, null);
    }

    public removeCRPR(tlId: number, crprId: number): Observable<any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/remove/cronPeriod/' + crprId, null, null);
    }

    public addPeriod(tlId: number, periodId: number): Observable<any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/add/period/' + periodId, null, null);
    }

    public removePeriod(tlId: number, periodId: number): Observable<any> {
        return this.authenticate('get', this.getResourceUrl() + '/' + tlId + '/remove/period/' + periodId, null, null);
    }

    protected getResourceUrl() {
        return this.getRootResourceUrl() + '/timeline';
    }

}
