import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
