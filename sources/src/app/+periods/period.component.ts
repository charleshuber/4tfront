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
      this.createPeriod("period-" + new Date().getTime());
    }
  }

  private savePeriod(){
    if(this.id){
      let thiz = this;
      this.cpprService.update(this.period).subscribe(newOne => {
        thiz.id = newOne.id;
        thiz.period = newOne;
      });
    } else {
      if(this.period.name && this.period.name.length > 0){
          this.createPeriod(this.period.name);
      }
    }
  }

  private loadPeriod(){
    let thiz = this;
    this.cpprService.read(this.id).subscribe(period => {
      thiz.period = period;
    });
  }

  private createPeriod(name: string){
    let thiz = this;
    let newCppr = new CompiledPeriod();
    newCppr.name = name;
    this.cpprService.create(newCppr).subscribe(newOne => {
      thiz.id = newOne.id;
      thiz.period = newOne;
    });
  }
}
