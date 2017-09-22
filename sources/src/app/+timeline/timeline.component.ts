import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TimelineService } from '../rest/resources/timeline/timeline.service';
import { Timeline } from '../rest/resources/timeline/timeline';

@Component({
  selector: 'timeline',
  template: require('./timeline.html'),
  styleUrls: ['./timeline.scss']
})
export class TimelineComponent implements OnInit {

  private id: number;
  private timeline: Timeline = new Timeline();

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
