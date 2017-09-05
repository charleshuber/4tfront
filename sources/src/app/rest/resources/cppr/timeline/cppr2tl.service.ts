import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceService } from '../../resource.service';
import { CPPR2TL } from './cppr2tl';

@Injectable()
export class CompiledPeriodService extends ResourceService<CPPR2TL> {

  public getAllOfCPPR(cpprid: number): Observable<CPPR2TL[] | any> {
    return this.authenticate('get', this.getResourceUrl() + '/all/' + cpprid, null, null);
  }

  protected getResourceUrl() {
    return this.getRootResourceUrl() + '/compiledPeriod/timeline';
  }

}
