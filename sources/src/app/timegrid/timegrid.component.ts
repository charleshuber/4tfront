import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {Timerange} from './timerange';

import {TimeUnit, TimeUnitUtils} from './timeunit';
import {GridBuilder} from './gridbuilder';
import { TimeInterval } from '../rest/resources/time/timeinterval';

@Component({
  selector: 'timegrid',
  template: require('./timegrid.html'),
  styleUrls: ['./timegrid.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimegridComponent implements OnInit, AfterViewInit {

  public timeunits = TimeUnit;
  public keys;
  private _unit: TimeUnit = TimeUnit.DAY;
  private _size: number = 1;
  private _target: Date = new Date();
  private _timerange: Timerange;
  private _maxresolution = 5;
  private _gridId: string;
  private builder: GridBuilder;
  private _intervals: TimeInterval[];

  @Output()
  private rendered: EventEmitter <TimeInterval> = new EventEmitter();

  @Input() set intervals(value: TimeInterval[]) {
     this._intervals = value;
     this.printIntervals();
  }

  public ngOnInit() {
      this.keys = Object.keys(this.timeunits).filter(f => !isNaN(Number(f)));
      this._gridId = "timegrid-" + Math.random();
      this.compute();
  }

  public ngAfterViewInit() {
      this.render();
  }

  get gridId(){
    return this._gridId;
  }

  get unit() {
    return this._unit;
  }

  set unit(unit: any){
    let previousTimeUnit = this._unit;
    this._unit = parseInt(unit);
    this.compute();
    if(!this.isViewValid()){
      this._unit = previousTimeUnit;
      this.compute();
      let unitSelection = <HTMLSelectElement> document.getElementById(this._gridId + '-unit');
      let oldSelectedOption = <HTMLOptionElement> unitSelection.querySelector('option[value="' + this._unit + '"]');
      unitSelection.selectedIndex = oldSelectedOption.index;
    }
    this.render();
  }

  set size(size: number){
    let previousSize = this._size;
    this._size = size;
    this.compute();
    if(!this.isViewValid()){
      this._size = previousSize;
      this.compute();
      let sizeInput = <HTMLInputElement> document.getElementById(this._gridId + '-size');
      sizeInput.value = '' + this._size;
    }
    this.render();
  }

  set date(date: Date){
    let previousDate = this._target;
    this._target = date;
    this.compute();
    if(!this.isViewValid()){
      this._target = previousDate;
      this.compute();
    }
    this.render();
  }

  get size(){
    return this._size;
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

  public onResize(event){
    this.compute();
    while(!this.isViewValid()){
      this._size--;
      this.compute();
    }
    this.render();
    //Just to be aware of window resize event in order to bind offsetWidth with dom
  }

  get offsetwidth(): number {
    return document.getElementById(this._gridId).offsetWidth;
  }

  get maxrowsize(){
    return Math.trunc(this.offsetwidth / this._maxresolution);
  }

  get rowsize(){
    return Math.trunc(this.offsetwidth / this._maxresolution);
  }

  get lowerTimeUnit(): TimeUnit{
    let maxrowsize = this.maxrowsize;
    if(maxrowsize >= this._timerange.asMinutes) return TimeUnit.MINUTE;
    if(maxrowsize >= this._timerange.asHours) return TimeUnit.HOUR;
    if(maxrowsize >= this._timerange.asDays) return TimeUnit.DAY;
    if(maxrowsize >= this._timerange.asWeeks) return TimeUnit.WEEK;
    if(maxrowsize >= this._timerange.asMonths) return TimeUnit.MONTH;
    return TimeUnit.YEAR;
  }

  get timeUnitNumber(){
    switch(this._unit){
      case TimeUnit.MINUTE:
      return this._timerange.asMinutes;
      case TimeUnit.HOUR:
      return this._timerange.asHours;
      case TimeUnit.DAY:
      return this._timerange.asDays;
      case TimeUnit.WEEK:
      return this._timerange.asWeeks;
      case TimeUnit.MONTH:
      return this._timerange.asMonths;
      case TimeUnit.YEAR:
      return this._timerange.asYears;
    }
    return 0
  }

  private isViewValid(): boolean{
    return this.timeUnitNumber <= this.maxrowsize;
  }
  private computeAndRender(){
    this.compute();
    this.render();
  }

  private compute(){
    this._timerange = this.computeTimerange();
  }

  private render(){
    this.builder = new GridBuilder(this._gridId, this._unit, this._timerange, this.startDate, this.endDate, this._target, this._maxresolution);
    this.builder.render();
    let timeInterval = new TimeInterval();
    timeInterval.startTime = this.startDate;
    timeInterval.endTime = this.endDate;
    //this.rendered.emit(timeInterval);
  }

  private printIntervals(){
    if(this._intervals && this.builder){
        this.builder.printIntervals(this._intervals);
    }
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
    timerange.asWeeks = Math.trunc((timerange.asDays / 7)) + (timerange.asDays % 7 > 0 ? 1 : 0);
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

  private beforeRange(): number{
    return Math.trunc(this._size / 2);
  }

  private afterRange(): number{
    let overlay = this._size % 2;
    return Math.trunc(this._size / 2) + overlay;
  }
}

export enum ALIGN {
  LEFT,
  RIGHT,
  CENTER
}
