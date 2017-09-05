import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceService } from '../resource.service';
import { Period } from './period';

@Injectable()
export class PeriodService extends ResourceService<Period> {

  public getAllOfTimeline(tlid: number): Observable<Period[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/timeline/' + tlid, null, null);
  }

  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/period';
  }

}
