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

  private sub: Subscription;
  private id: number;
  private Timeline: Timeline = new Timeline();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tlService: TimelineService) { }

  public ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = +params['id'] || null;
        this.getTimeline(null);
      });
  }

  public getTimeline(successCallback) {
    if(this.id){
      this.loadTimeline();
    } else {
      this.createTimeline("Timeline-" + new Date().getTime());
    }
  }

  private saveTimeline(){
    if(this.id){
      let thiz = this;
      this.tlService.update(this.Timeline).subscribe(newOne => {
        thiz.id = newOne.id;
        thiz.Timeline = newOne;
      });
    } else {
      if(this.Timeline.name && this.Timeline.name.length > 0){
          this.createTimeline(this.Timeline.name);
      }
    }
  }

  private loadTimeline(){
    let thiz = this;
    this.tlService.read(this.id).subscribe(Timeline => {
      thiz.Timeline = Timeline;
    });
  }

  private createTimeline(name: string){
    let thiz = this;
    let newCppr = new Timeline();
    newCppr.name = name;
    this.tlService.create(newCppr).subscribe(newOne => {
      thiz.id = newOne.id;
      thiz.Timeline = newOne;
    });
  }

  public deleteTimeline(){
    let thiz = this;
    return this.tlService.delete(this.id)
      .subscribe((Timeline) => {
        thiz.back();
      },
      (error) => {});
  }

  back(){
    this.location.back();
  }
}
