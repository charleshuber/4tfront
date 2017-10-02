import {TimeUnit} from './timeunit';
import {Timerange} from './timerange';
import {DateUtils} from './dateutils';


export class GridBuilder {

  private _unit: TimeUnit;
  private _range: Timerange;
  private _start: Date;
  private _end: Date;
  private _date: Date;
  private _maxresolution: number;
  private _row: HTMLElement;

  constructor(unit: TimeUnit, range: Timerange, start: Date, end: Date, date: Date, maxresolution: number){
    this._unit = unit;
    this._range = range;
    this._start = start;
    this._end = end;
    this._date = date;
    this._maxresolution = maxresolution;
  }

  public buildRowGrid():HTMLElement{
    switch(this._unit){
      case TimeUnit.MINUTE: this._row = this.buildMinutesColumns(); break;
      case TimeUnit.HOUR: this._row = this.buildHoursColumns(); break;
      case TimeUnit.DAY: this._row = this.buildDaysColumns(); break;
      case TimeUnit.WEEK: this._row = this.buildWeeksColumns(); break;
      case TimeUnit.MONTH: this._row = this.buildMonthsColumns(); break;
      case TimeUnit.YEAR: this._row = this.buildYearsColumns(); break;
    }
    this._row.classList.add('timegrid-row');
    return this._row;
  }


  public compute(){
    let contentCells = this._row.querySelectorAll('.timegrid-col-content');
    for(let i=0; i< contentCells.length; i++){
      let contentCell: HTMLElement = <HTMLElement> contentCells.item(i);
      let width = Math.trunc(contentCell.offsetWidth / this._maxresolution);
      let childNumber = this.childElementsNumber(this._unit, (<any>contentCell).date);
      if(childNumber < width){
        for(let y=0; y < childNumber; y++){
          let childColumn = document.createElement('div');
          childColumn.classList.add('timegrid-col');
          childColumn.classList.add('timegrid-col-0');
          contentCell.appendChild(childColumn);
        }
      }
    }
  }

  private buildMinutesColumns():HTMLElement {
    let component = this;
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
    let component = this;
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
      {format: (date:Date) => { return date.getMonth() + 1}});
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
      let isReference = DateUtils.trunc(this._date, this._unit).getTime() === DateUtils.trunc(currentDate, this._unit).getTime();
      let column = this.buildTimeGridColumn(currentDate, labelformatter.format(currentDate), isReference);
      column.classList.add(cellsclass);
      row.appendChild(column);
      currentDate = incrementor.increment(currentDate);
    }
    row.classList.add(rowclass);
    return row;
  }

  private buildTimeGridColumn(date: Date, label:string, isReference: boolean){
    let column = document.createElement('div');
    column.classList.add('timegrid-col');
    if(isReference){
      column.classList.add('timegrid-col-reference');
    }
    let content = document.createElement('div');
    content.classList.add('timegrid-col-content');
    (<any> content).date = date;

    let labelCell = document.createElement('div');
    labelCell.classList.add('timegrid-col-label');

    column.appendChild(content);
    column.appendChild(labelCell);
    labelCell.innerHTML = label;

    (<any> column).date = date;

    return column;
  }

  private childElementsNumber(unit: TimeUnit, date: Date){
    switch(unit){
      case TimeUnit.MINUTE: return 0;
      case TimeUnit.HOUR: return 60;
      case TimeUnit.DAY: return 24;
      case TimeUnit.WEEK: return 7;
      case TimeUnit.MONTH: new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      case TimeUnit.YEAR: return 12;
    }
  }

}
