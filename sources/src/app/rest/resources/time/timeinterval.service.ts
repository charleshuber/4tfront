import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceService } from '../resource.service';
import { TimeInterval } from './timeinterval';

@Injectable()
export class PeriodService extends ResourceService<TimeInterval> {

  public timelineCompilation(tlid: number, start: Date, end: Date): Observable<TimeInterval[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/timeline/' + tlid + '/' + start.getTime() + '/' + end.getTime(), null, null);
  }

  public cpprCompilation(cpprId: number, start: Date, end: Date): Observable<TimeInterval[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/compiledPeriod/' + cpprId + '/' + start.getTime() + '/' + end.getTime(), null, null);
  }

  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/timecompilation';
  }

}
