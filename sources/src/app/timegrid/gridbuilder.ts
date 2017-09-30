import {TimeUnit} from './timeunit';
import {Timerange} from './timerange';
import {DateUtils} from './dateutils';


export class GridBuilder {

  private _unit: TimeUnit;
  private _range: Timerange;
  private _start: Date;
  private _end: Date;
  private _date: Date;

  constructor(unit: TimeUnit, range: Timerange, start: Date, end: Date, date: Date){
    this._unit = unit;
    this._range = range;
    this._start = start;
    this._end = end;
    this._date = date;
  }

  public buildRowGrid():HTMLElement{
    let row: HTMLElement = null;
    switch(this._unit){
      case TimeUnit.MINUTE: row = this.buildMinutesColumns(); break;
      case TimeUnit.HOUR: row = this.buildHoursColumns(); break;
      case TimeUnit.DAY: row = this.buildDaysColumns(); break;
      case TimeUnit.WEEK: row = this.buildWeeksColumns(); break;
      case TimeUnit.MONTH: row = this.buildMonthsColumns(); break;
      case TimeUnit.YEAR: row = this.buildYearsColumns(); break;
    }
    row.classList.add('timegrid-row');
    return row;
  }

  private buildMinutesColumns():HTMLElement {
    return this.buildColumns(
      this._range.asMinutes,
      {increment: (date:Date) => {
        let result = new Date(date.getTime());
        result.setMinutes(date.getMinutes() + 1);
        return result;
      }},
      'timegrid-row-minutes',
      'timegrid-col-minute',
      {format: (date:Date) => { return date.getMinutes()}});
  }

  private buildHoursColumns():HTMLElement {
    return this.buildColumns(
      this._range.asHours,
      {increment: (date:Date) => {
        let result = new Date(date.getTime());
        result.setHours(date.getHours() + 1);
        return result;
      }},
      'timegrid-row-hours',
      'timegrid-col-hour',
      {format: (date:Date) => { return date.getHours()}});
  }

  private buildDaysColumns():HTMLElement{
    return this.buildColumns(
      this._range.asDays,
      {increment: (date:Date) => {
        let result = new Date(date.getTime());
        result.setDate(date.getDate() + 1);
        return result;
      }},
      'timegrid-row-days',
      'timegrid-col-day',
      {format: (date:Date) => { return date.getDate()}});
  }

  private buildWeeksColumns():HTMLElement {
    return this.buildColumns(
      this._range.asWeeks,
      {increment: (date:Date) => {
        let result = new Date(date.getTime());
        result.setDate(date.getDate() + 8);
        return result;
      }},
      'timegrid-row-weeks',
      'timegrid-col-week',
      {format: (date:Date) => { return date.getDate()}});
  }

  private buildMonthsColumns():HTMLElement {
    return this.buildColumns(
      this._range.asMonths,
      {increment: (date:Date) => {
        let result = new Date(date.getTime());
        result.setMonth(date.getMonth() + 1);
        return result;
      }},
      'timegrid-row-months',
      'timegrid-col-month',
      {format: (date:Date) => { return date.getMonth()}});
  }

  private buildYearsColumns():HTMLElement {
    return this.buildColumns(
      this._range.asYears,
      {increment: (date:Date) => {
        let result = new Date(date.getTime());
        result.setFullYear(date.getFullYear() + 1);
        return result;
      }},
      'timegrid-row-years',
      'timegrid-col-year',
      {format: (date:Date) => { return date.getFullYear()}});
  }

  private buildColumns(rowsize: number, incrementor, rowclass: string, cellsclass: string, labelformatter):HTMLElement {
    let row = document.createElement('div');
    let currentDate: Date = DateUtils.trunc(this._start, this._unit);
    for(let i=0; i < rowsize; i++){
      let column = this.buildTimeGridColumn(currentDate, labelformatter);
      column.classList.add(cellsclass);
      row.appendChild(column);
      currentDate = incrementor.increment(currentDate);
    }
    row.classList.add(rowclass);
    return row;
  }

  private buildTimeGridColumn(date: Date, labelformatter){
    let column = document.createElement('div');
    column.classList.add('timegrid-col');

    let content = document.createElement('div');
    content.classList.add('timegrid-col-content');
    let label = document.createElement('div');
    label.classList.add('timegrid-col-label');

    column.appendChild(content);
    column.appendChild(label);
    label.innerHTML = labelformatter.format(date);

    (<any>column).date = date;
    return column;
  }
}
