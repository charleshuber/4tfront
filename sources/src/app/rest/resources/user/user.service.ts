import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ResourceService } from '../resource.service';
import { User } from './user';

@Injectable()
export class UserService extends ResourceService<User> {

  public getAllOfGroup(groupId: number): Observable<User[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/allOfGroup/' + groupId, null, null);
  }
    
  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/user';
  }

}
