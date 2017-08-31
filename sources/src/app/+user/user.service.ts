import { ResourceService } from '../resource.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class UserService extends ResourceService<User> {

  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/user';
  }

}
