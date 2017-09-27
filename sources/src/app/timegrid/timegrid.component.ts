import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'timegrid',
  template: require('./timegrid.html'),
  styleUrls: ['./timegrid.scss']
})
export class TimegridComponent implements OnInit {

  public timeunits = TimeUnit;
  public keys;
  private _unit: TimeUnit = TimeUnit.DAY;
  private _size: number = 1;
  private _target: Date = new Date();
  private _timerange: Timerange;
  private _resolution = 5;
  private _gridId: string;

  public ngOnInit() {
      this._timerange = this.computeTimerange();
      this.keys = Object.keys(this.timeunits).filter(f => !isNaN(Number(f)));
      this._gridId = "timegrid-" + Math.random();
  }

  set unit(unit: any){
    switch(unit){
      case '1': this._unit = TimeUnit.MINUTE; break;
      case '2': this._unit = TimeUnit.HOUR; break;
      case '3': this._unit = TimeUnit.DAY; break;
      case '4': this._unit = TimeUnit.WEEK; break;
      case '5': this._unit = TimeUnit.MONTH; break;
      case '6': this._unit = TimeUnit.YEAR; break;
    }
    this._timerange = this.computeTimerange();
  }

  get gridId(){
    return this._gridId;
  }

  get unit(){
    return this._unit;
  }

  set size(size: number){
    this._size = size;
    this._timerange = this.computeTimerange();
  }

  get size(){
    return this._size;
  }

  set date(date: Date){
    this._target = date;
    this._timerange = this.computeTimerange();
  }

  get date(){
    return this._target;
  }

  get startDate(): Date {
    return this.dateRange(true);
  }

  get endDate(): Date {
    return this.dateRange(false);
  }

  get timerange(): Timerange {
    return this._timerange;
  }

  public resolution(): TimeUnit {
    return null;
  }

  private computeTimerange(): Timerange {
    let timerange = new Timerange();
    let startDate = this.startDate;
    let endDate = this.endDate;
    let rangeAsMillis: number = endDate.getTime() - startDate.getTime();
    let rangeAsMonth: number = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
    let rangeAsYear: number = endDate.getFullYear() - startDate.getFullYear() + 1;

    timerange.asMinutes = Math.trunc((rangeAsMillis / (60 * 1000))) + (rangeAsMillis % (60 * 1000) > 0 ? 1 : 0);
    timerange.asHours = Math.trunc((rangeAsMillis / (60 * 60 * 1000))) + (rangeAsMillis % (60 * 60 * 1000) > 0 ? 1 : 0);
    timerange.asDays = Math.trunc((rangeAsMillis / (24 * 60 * 60 * 1000))) + (rangeAsMillis % (24 * 60 * 60 * 1000) > 0 ? 1 : 0);
    timerange.asMonths = rangeAsMonth;
    timerange.asYears = rangeAsYear;
    return timerange;
  }

  private dateRange(before: boolean): Date {
    let rangeDateBorder = new Date(this._target.getTime());
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

  private getGridElement(){
    return document.querySelector(this._gridId);
  }

  private beforeRange(): number{
    return Math.trunc(this._size / 2);
  }

  private afterRange(): number{
    let overlay = this._size % 2;
    return Math.trunc(this._size / 2) + overlay;
  }

}

class Timerange {
  public asMinutes: number;
  public asHours: number;
  public asDays: number;
  public asMonths: number;
  public asYears: number;
}

export enum ALIGN {
  LEFT,
  RIGHT,
  CENTER
}

export enum TimeUnit {
  MINUTE = 1,
  HOUR = 2,
  DAY = 3 ,
  WEEK = 4,
  MONTH = 5,
  YEAR = 6
}
