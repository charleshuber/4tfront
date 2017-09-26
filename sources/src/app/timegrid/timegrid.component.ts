import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'timegrid',
  template: require('./timegrid.html'),
  styleUrls: ['./timegrid.scss']
})
export class TimegridComponent implements OnInit {

  private _unit: TimeUnit = TimeUnit.DAY;
  private _size: number = 10;
  private _target: Date = new Date();
  private _timerange: Timerange;

  public ngOnInit() {
  }

  get timerange(): Timerange {
    this._timerange = this.computeTimerange();
    return this._timerange;
  }

  public resolution(): TimeUnit {
    return null;
  }

  public computeTimerange(): Timerange {
    let timerange = new Timerange();
    let startDate = this.startDate();
    let endDate = this.endDate();
    let rangeAsMillis: number = endDate.getTime() - startDate.getTime();
    let rangeAsMonth: number = (endDate.getFullYear() * 12) - (startDate.getFullYear() * 12);
    let rangeAsYear: number = endDate.getFullYear() - startDate.getFullYear() + 1;

    timerange.asMinutes = (rangeAsMillis / (60 * 1000)) + (rangeAsMillis % (60 * 1000) > 0 ? 1 : 0);
    timerange.asHours = (rangeAsMillis / (60 * 60 * 1000)) + (rangeAsMillis % (60 * 60 * 1000) > 0 ? 1 : 0);
    timerange.asDays = (rangeAsMillis / (24 * 60 * 60 * 1000)) + (rangeAsMillis % (24 * 60 * 60 * 1000) > 0 ? 1 : 0);
    // Warn: first month index is 0, so we have to add 1 to month duration
    timerange.asMonths = (rangeDuration.getFullYear() * 12) + (rangeDuration.getMonth() + 1);
    timerange.asYears = rangeDuration.getFullYear();
    return timerange;
  }

  public startDate(): Date {
    return this.dateRange(true);
  }

  public endDate(): Date {
    return this.dateRange(false);
  }

  private dateRange(before: boolean): Date {
    let rangeDateBorder = this._target;
    let rangeBorder = this.afterRange();
    if(before){
      rangeBorder = this.beforeRange() * -1;
    }
    switch(this._unit){
      case TimeUnit.MINUTE:
      rangeDateBorder.setMinutes(rangeDateBorder.getMinutes() + rangeBorder);
      break;
      case TimeUnit.HOUR:
      rangeDateBorder.setHours(rangeDateBorder.getHours() + rangeBorder);
      break;
      case TimeUnit.DAY:
      rangeDateBorder.setDate(rangeDateBorder.getDate() + rangeBorder);
      break;
      case TimeUnit.WEEK:
      rangeDateBorder.setDate(rangeDateBorder.getDate() + (7 * rangeBorder));
      break;
      case TimeUnit.MONTH:
      rangeDateBorder.setMonth(rangeDateBorder.getMonth() + rangeBorder);
      break;
      case TimeUnit.YEAR:
      rangeDateBorder.setFullYear(rangeDateBorder.getFullYear() + rangeBorder);
      break;
    }
    return rangeDateBorder;
  }

  private beforeRange(): number{
    return this._size / 2;
  }

  private afterRange(): number{
    let overlay = this._size % 2;
    return (this._size / 2) + overlay;
  }

}

class Timerange {
  public asMinutes: number;
  public asHours: number;
  public asDays: number;
  public asMonths: number;
  public asYears: number;
}

const enum TimeUnit {
  MINUTE = 1,
  HOUR = 2,
  DAY = 3 ,
  WEEK = 4,
  MONTH = 5,
  YEAR = 6
}
