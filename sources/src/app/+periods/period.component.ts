import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CompiledPeriodService } from '../rest/resources/cppr/compiledperiod.service';
import { CompiledPeriod } from '../rest/resources/cppr/compiledperiod';
import { TimelineService } from '../rest/resources/timeline/timeline.service';
import { Timeline } from '../rest/resources/timeline/timeline';


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
    private location: Location,
    private cpprService: CompiledPeriodService,
    private tlService: TimelineService) { }

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

  private createTimeline(){
    let thiz = this;
    let newTimeline = new Timeline();
    newTimeline.name = "Timeline-" + new Date().getTime();
    this.tlService.create(newTimeline).subscribe(newOne => {
      thiz.goToTimeline(newOne.id);
    });
  }

  public deletePeriod(){
    let thiz = this;
    return this.cpprService.delete(this.id)
      .subscribe((period) => {
        thiz.back();
      },
      (error) => {});
  }

  goToTimeline(timelineId: number){
      this.router.navigate(['/periods/timeline-detail', timelineId]);
  }

  back(){
    this.location.back();
  }
}
