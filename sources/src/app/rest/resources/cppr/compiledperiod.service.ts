import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceService } from '../resource.service';
import { CompiledPeriod } from './compiledperiod';

@Injectable()
export class CompiledPeriodService extends ResourceService<CompiledPeriod> {

  public getAllOfTimeline(tlid: number): Observable<CompiledPeriod[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/timeline/' + tlid, null, null);
  }

  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/compiledPeriod';
  }

}
