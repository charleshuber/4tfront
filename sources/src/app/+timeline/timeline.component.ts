import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TimelineService } from '../rest/resources/timeline/timeline.service';
import { Timeline } from '../rest/resources/timeline/timeline';
import { TimeInterval } from '../rest/resources/time/timeinterval';
import { TimeIntervalInfo } from '../timegrid/timeintervalinfo';

@Component({
  selector: 'timeline',
  template: require('./timeline.html'),
  styleUrls: ['./timeline.scss']
})
export class TimelineComponent implements OnInit {

  private id: number;
  private timeline: Timeline = new Timeline();
  private periods: TimeIntervalInfo[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tlService: TimelineService) { }

  public ngOnInit() {
    let thiz = this;
    this.route.params.subscribe(params => {
      thiz.id = +params['id'] || null;
      thiz.getTimeline(null);
    });
  }

  public getTimeline(successCallback) {
    if(this.id){
      this.loadTimeline();
    }
  }

  public gridRendered(event){
    this.periods = [];
    let ti: TimeInterval =  new TimeInterval();
    let ti2: TimeInterval =  new TimeInterval();
    let ti3: TimeInterval =  new TimeInterval();

    ti.startTime = new Date();
    ti.endTime = new Date();
    ti.startTime.setHours(ti.startTime.getHours()-1);
    ti.endTime.setHours(ti.endTime.getHours()+1);

    ti2.startTime = new Date();
    ti2.endTime = new Date();
    ti2.startTime.setHours(ti2.startTime.getHours()-2);
    ti2.endTime.setHours(ti2.endTime.getHours()+2);

    ti3.startTime = new Date();
    ti3.endTime = new Date();
    ti3.startTime.setHours(ti2.startTime.getHours()-3);
    ti3.endTime.setHours(ti2.endTime.getHours()+10);

    this.periods = [];
    this.periods.push(new TimeIntervalInfo(ti, '#c48', 'period 1'));
    this.periods.push(new TimeIntervalInfo(ti2, '#8c4', 'period 2'));
    this.periods.push(new TimeIntervalInfo(ti3, '#48c', 'period 3'));
  }

  private saveTimeline(){
    if(this.id){
      let thiz = this;
      this.tlService.update(this.timeline).subscribe(newOne => {
        thiz.id = newOne.id;
        thiz.timeline = newOne;
      });
    } else {
      if(this.timeline.name && this.timeline.name.length > 0){
          this.createTimeline(this.timeline.name);
      }
    }
  }

  private loadTimeline(){
    let thiz = this;
    this.tlService.read(this.id).subscribe(Timeline => {
      thiz.timeline = Timeline;
    });
  }

  private createTimeline(name: string){
    let thiz = this;
    let newTl = new Timeline();
    newTl.name = name;
    this.tlService.create(newTl).subscribe(newOne => {
      thiz.id = newOne.id;
      thiz.timeline = newOne;
    });
  }

  public deleteTimeline(){
    let thiz = this;
    return this.tlService.delete(this.id)
      .subscribe((timeline) => {
        thiz.back();
      },
      (error) => {});
  }

  back(){
    this.location.back();
  }
}
