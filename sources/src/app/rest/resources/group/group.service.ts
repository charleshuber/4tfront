import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ResourceService } from '../resource.service';
import { Group } from './group';

@Injectable()
export class GroupService extends ResourceService<Group> {

  public getAllOfUser(userId: number): Observable<Group[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/allOfGroup/' + userId, null, null);
  }
    
  public children(groupId: number): Observable<Group[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/' + groupId + '/children', null, null);
  }
    
  public parents(groupId: number): Observable<Group[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/' + groupId + '/parents', null, null);
  }
    
  public addChild(groupId: number, childId: number): Observable<any> {
    return this.authenticate('get', this.getResourceUrl() + '/' + groupId + '/addChild/' + childId, null, null);
  }
    
  public removeChild(groupId: number, childId: number): Observable<any> {
    return this.authenticate('get', this.getResourceUrl() + '/' + groupId + '/removeChild/' + childId, null, null);
  }
    
  public addUser(groupId: number, userId: number): Observable<any> {
    return this.authenticate('get', this.getResourceUrl() + '/' + groupId + '/addUser/' + userId, null, null);
  }
    
  public removeUser(groupId: number, userId: number): Observable<any> {
    return this.authenticate('get', this.getResourceUrl() + '/' + groupId + '/removeUser/' + userId, null, null);
  }
    
  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/group';
  }

}
