import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ResourceService } from '../resource.service';
import { CronPeriod } from './cronperiod';

@Injectable()
export class CronPeriodService extends ResourceService<CronPeriod> {

  public getAllOfTimeline(tlid: number): Observable<CronPeriod[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/timeline/' + tlid, null, null);
  }

  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/cronperiod';
  }

}
