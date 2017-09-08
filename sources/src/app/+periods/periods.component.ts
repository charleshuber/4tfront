import {
  Component,
  OnInit,
} from '@angular/core';

import { CompiledPeriodService } from '../rest/resources/cppr/compiledperiod.service';
import { CompiledPeriod } from '../rest/resources/cppr/compiledperiod';

@Component({
  selector: 'periods',
  template: require('./periods.html'),
  styleUrls: ['./periods.scss']
})
export class PeriodsComponent implements OnInit {

  public periods: CompiledPeriod[];

  constructor(private cpprService: CompiledPeriodService) { }

  public ngOnInit() {
    this.getPeriods(null);
  }

  public getPeriods(successCallback) {
    /*
    return this.cpprService.getAll()
      .subscribe(
      (periods) => {
        this.periods = periods;
        if (successCallback) {
          successCallback();
        }
      },
      (error) => {});
      */
  }
}
