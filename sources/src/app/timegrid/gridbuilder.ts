import {TimeUnit} from './timeunit';
import {Timerange} from './timerange';


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

  public renderRowGrid():HTMLElement{
    let row: HTMLElement = null;
    switch(this._unit){
      case TimeUnit.MINUTE: row = this.renderMinutesColumns(); break;
      case TimeUnit.HOUR: row = this.renderHoursColumns(); break;
      case TimeUnit.DAY: row = this.renderDaysColumns(); break;
      case TimeUnit.WEEK: row = this.renderWeeksColumns(); break;
      case TimeUnit.MONTH: row = this.renderMonthsColumns(); break;
      case TimeUnit.YEAR: row = this.renderYearsColumns(); break;
    }
    row.classList.add('timegrid-row');
    return row;
  }

  private renderMinutesColumns():HTMLElement {
    let row = document.createElement('div');

    row.classList.add('timegrid-row-minutes');
    return row;
  }

  private renderHoursColumns():HTMLElement {
    let row = document.createElement('div');

    row.classList.add('timegrid-row-hours');
    return row;
  }

  private renderDaysColumns():HTMLElement {
    let row = document.createElement('div');
    let currentDate: Date = new Date(this._start.getTime());
    currentDate.setMilliseconds(0);
    currentDate.setMinutes(0);
    currentDate.setHours(0);

    for(let i=0; i < this._range.asDays; i++){
      let column = this.buildTimeGridColumn(currentDate, {format: (date:Date) => { return date.getDate()}});
      column.classList.add('timegrid-col-day');
      row.appendChild(column);
      currentDate = new Date(currentDate.getTime());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    row.classList.add('timegrid-row-days');
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

  private renderWeeksColumns():HTMLElement {
    let row = document.createElement('div');

    row.classList.add('timegrid-row-weeks');
    return row;
  }

  private renderMonthsColumns():HTMLElement {
    let row = document.createElement('div');

    row.classList.add('timegrid-row-months');
    return row;
  }

  private renderYearsColumns():HTMLElement {
    let row = document.createElement('div');

    row.classList.add('timegrid-row-years');
    return row;
  }
}
