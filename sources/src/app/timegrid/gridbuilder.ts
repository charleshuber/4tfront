import {TimeUnit} from './timeunit';
import {Timerange} from './timerange';
import {DateUtils} from './dateutils';


export class GridBuilder {


  private timegridColClass = 'timegrid-col';

  private grid: HTMLElement = null;
  private _unit: TimeUnit;
  private _range: Timerange;
  private _start: Date;
  private _end: Date;
  private _date: Date;
  private _maxresolution: number;

  constructor(targetId: string, unit: TimeUnit, range: Timerange, start: Date, end: Date, date: Date, maxresolution: number){
    this.grid = document.getElementById(targetId);
    this._unit = unit;
    this._range = range;
    this._start = start;
    this._end = end;
    this._date = date;
    this._maxresolution = maxresolution;
  }

  public render(){
      this.renderRowGrid(this.grid, this._unit);
  }

  private renderRowGrid(parent:HTMLElement, unit: TimeUnit){
    this.emptyElement(parent);
    let row = document.createElement('div');
    parent.appendChild(row);

    let rowsize = 0;
    switch(unit){
      case TimeUnit.MINUTE: rowsize = this._range.asMinutes; break;
      case TimeUnit.HOUR: rowsize = this._range.asHours; break;
      case TimeUnit.DAY: rowsize = this._range.asDays; break;
      case TimeUnit.WEEK: rowsize = this._range.asWeeks; break;
      case TimeUnit.MONTH: rowsize = this._range.asMonths; break;
      case TimeUnit.YEAR: rowsize = this._range.asYears;
    }
    this.renderColumns(row, unit, rowsize, 0);
  }

  private renderColumns(target: HTMLElement, unit: TimeUnit, rowsize: number, level: number) {
    let currentDate: Date = DateUtils.trunc(this._start, this._unit);
    let classes = this.getClasses(unit);
    let rowClass = classes[0];
    let cellClass = classes[1];

    let columns: HTMLElement[] = this.renderGridColumns(target, rowsize, currentDate, unit, level, cellClass);

    let childUnit = this.child(unit);
    if(childUnit){
      for(let i=0; i<columns.length; i++){
        let column: HTMLElement = columns[i];
        let columnDate = new Date(parseInt(column.getAttribute('data-date')));
        let childNumber = this.childElementsNumber(unit, columnDate);
        let width = Math.trunc(column.offsetWidth / this._maxresolution);
        if(width > childNumber){
          let content: HTMLElement = <HTMLElement> column.querySelector('.timegrid-col-content');
          let innerContent = document.createElement('div');
          content.appendChild(innerContent);
          this.renderColumns(innerContent, childUnit, childNumber, level + 1);
        }
      }
    }

    target.classList.add('timegrid-row');
    target.classList.add('timegrid-row-' + level);
    target.classList.add(rowClass);
    target.classList.add(rowClass + '-' + level);
  }

  private renderGridColumns(target: HTMLElement, rowsize: number, currentDate: Date, unit: TimeUnit, level: number, colClass: string) : HTMLElement[]{
    let columns: HTMLElement[] = [];
    for(let i=0; i < rowsize; i++){
      let column = document.createElement('div');
      target.appendChild(column);
      column.classList.add(colClass);
      column.classList.add(colClass + '-' + level);
      column.classList.add(this.timegridColClass);
      column.classList.add(this.timegridColClass +'-' + level);
      column.setAttribute('data-date', '' + currentDate.getTime());
      column.setAttribute('data-date-formatted', '' + DateUtils.formatDate(currentDate, 'dd/MM/yyyy'));

      this.renderTimeGridColumn(column, currentDate, unit, level);
      columns.push(column);
      currentDate = DateUtils.increment(currentDate, unit);
    }
    return columns;
  }

  private renderTimeGridColumn(target:HTMLElement, date: Date, unit: TimeUnit, level: number){
    let isReference = DateUtils.trunc(this._date, this._unit).getTime() === DateUtils.trunc(date, this._unit).getTime();
    if(isReference){
      target.classList.add('timegrid-col-reference');
    }
    let content = document.createElement('div');
    content.classList.add('timegrid-col-content');
    content.classList.add('timegrid-col-content-' + level);

    content.setAttribute('data-date', '' + date.getTime());
    content.setAttribute('data-date-formatted', '' + date);

    let labelCell = document.createElement('div');
    labelCell.classList.add('timegrid-col-label');
    labelCell.classList.add('timegrid-col-label-' + level);

    target.appendChild(content);
    target.appendChild(labelCell);
    this.printLabel(labelCell, date, unit, level);
  }

  private getClasses(unit:TimeUnit):string[] {
    switch(unit){
      case TimeUnit.MINUTE: return ['timegrid-row-minutes','timegrid-col-minute'];
      case TimeUnit.HOUR: return ['timegrid-row-hours','timegrid-col-hour'];
      case TimeUnit.DAY: return ['timegrid-row-days','timegrid-col-day'];
      case TimeUnit.WEEK: return ['timegrid-row-weeks','timegrid-col-week'];
      case TimeUnit.MONTH: return ['timegrid-row-months','timegrid-col-month'];
      case TimeUnit.YEAR: return ['timegrid-row-years','timegrid-col-year'];
    }
    return ['',''];
  }

  private printLabel(labelCell: HTMLElement, date: Date, unit: TimeUnit, level: number){
    switch(unit){
      case TimeUnit.MINUTE: this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm', 'mm']); return;
      case TimeUnit.HOUR: this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm', 'mm']); return;
      case TimeUnit.DAY: this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm', 'mm']); return;
      case TimeUnit.WEEK: this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm', 'mm']); return;
      case TimeUnit.MONTH: this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm', 'mm']); return;
      case TimeUnit.YEAR: this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm', 'mm']); return;
    }
  }

  private printLabelWithPatterns(labelCell: HTMLElement, date: Date, level: number, patterns:string[]){
    let startWidth = labelCell.offsetWidth;
    for(let i = level; i < patterns.length; i++){
      let formatted = DateUtils.formatDate(date, patterns[i]);
      labelCell.innerHTML = formatted;
      let currentWidth = labelCell.offsetWidth;
      if(currentWidth == startWidth){
        return;
      }
      this.emptyElement(labelCell);
    }
  }

  private childElementsNumber(unit: TimeUnit, date: Date){
    switch(unit){
      case TimeUnit.MINUTE: return 0;
      case TimeUnit.HOUR: return 60;
      case TimeUnit.DAY: return 24;
      case TimeUnit.WEEK: return 7;
      case TimeUnit.MONTH: return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      case TimeUnit.YEAR: return 12;
    }
  }

  private child(unit: TimeUnit): TimeUnit{
    switch(unit){
      case TimeUnit.HOUR: return TimeUnit.MINUTE;
      case TimeUnit.DAY: return TimeUnit.HOUR;
      case TimeUnit.WEEK: return TimeUnit.DAY;
      case TimeUnit.MONTH: return TimeUnit.DAY;
      case TimeUnit.YEAR: return TimeUnit.MONTH;
    }
    return null;
  }

  private emptyElement(element: HTMLElement){
    if(element){
      while (element.firstChild) {
          element.removeChild(element.firstChild);
      }
    }
  }

}
