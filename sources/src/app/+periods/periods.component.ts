import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CompiledPeriodService } from '../rest/resources/cppr/compiledperiod.service';
import { CompiledPeriod } from '../rest/resources/cppr/compiledperiod';

@Component({
  selector: 'periods',
  template: require('./periods.html'),
  styleUrls: ['./periods.scss']
})
export class PeriodsComponent implements OnInit {

  public periods: CompiledPeriod[];

  constructor(
    private cpprService: CompiledPeriodService,
    private router: Router,
    private location: Location) { }

  public ngOnInit() {
    this.getPeriods(null);
  }

  public getPeriods(successCallback) {
    let thiz = this;
    return this.cpprService.getAll()
      .subscribe((periods) => {
        thiz.periods = periods;
        if (successCallback) {
          successCallback();
        }
      },
      (error) => {});
  }

  public deletePeriod(id: number){
    let thiz = this;
    return this.cpprService.delete(id)
      .subscribe((period) => {
        thiz.getPeriods(null);
      },
      (error) => {});
  }

  goToPeriod(id) {
    this.router.navigate(['/periods/details'], { queryParams: { id: id } });
  }

  back(){
    this.location.back();
  }
}
