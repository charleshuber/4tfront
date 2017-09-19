import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ActivatedRoute, Router } from '@angular/router';
import { CompiledPeriodService } from '../rest/resources/cppr/compiledperiod.service';
import { CompiledPeriod } from '../rest/resources/cppr/compiledperiod';

@Component({
  selector: 'period',
  template: require('./period.html'),
  styleUrls: ['./period.scss']
})
export class PeriodComponent implements OnInit {

  private sub: Subscription;
  private id: number;
  private period: CompiledPeriod = new CompiledPeriod();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cpprService: CompiledPeriodService) { }

  public ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = +params['id'] || null;
        this.getPeriod(null);
      });
  }

  public getPeriod(successCallback) {
    if(this.id){
      this.loadPeriod();
    } else {
      this.createPeriod();
    }
  }

  private loadPeriod(){

  }

  private createPeriod(){
    let newCppr = new CompiledPeriod();
    newCppr.name = "period-" + new Date().getTime();
    this.cpprService.create(newCppr).subscribe(newOne => this.period = newOne);
  }
}
