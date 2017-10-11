import {TimeUnit} from './timeunit';
import {Timerange} from './timerange';
import {DateUtils} from './dateutils';
import { TimeInterval } from '../rest/resources/time/timeinterval';


export class GridBuilder {

  private labelCharWidth = 10;
  private dateAttribute = 'data-date';
  private unitAttribute = 'data-timeunit';
  private levelAttribute = 'data-level';
  private timegridRowClass = 'timegrid-row';
  private timegridColClass = 'timegrid-col';
  private timegridColReferenceClass = this.timegridColClass + '-reference';
  private timegridColContentClass = this.timegridColClass + '-content';
  private timegridColLabelClass = this.timegridColClass + '-label';
  private timegridColReferenceContentClass = this.timegridColReferenceClass + '-content';
  private timegridColReferenceLabelClass = this.timegridColReferenceClass + '-label';
  private timegridRowCellClass = 'timegrid-row-cell';

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

  public printIntervals(intervals: TimeInterval[]){
    if(intervals && this.grid != null){
      this.buildPeriodsRows(intervals.length);
    }
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
    this.renderLabels();
  }

  private renderLabels(){
    levelloop:
    for(let level=0; level<2; level++){
      let labelCells = document.querySelectorAll('.' + this.timegridColLabelClass + '['+ this.levelAttribute +'="' + level + '"]');
      let forcedPattern = undefined;
      for(let i=0; i < labelCells.length; i++){
        let cell = <HTMLElement> labelCells.item(i);
        let date: Date = new Date(parseInt(cell.getAttribute(this.dateAttribute)));
        let unit: TimeUnit = parseInt(cell.getAttribute(this.unitAttribute));
        forcedPattern = this.printLabel(cell, date, unit, level, forcedPattern)
        if(!forcedPattern){
          continue levelloop;
        }
      }
    }
  }

  private renderColumns(target: HTMLElement, unit: TimeUnit, rowsize: number, level: number) {
    let currentDate: Date = DateUtils.trunc(this._start, this._unit);

    let columns: HTMLElement[] = this.renderGridColumns(target, rowsize, currentDate, unit, level);

    let childUnit = this.child(unit);
    if(childUnit){
      for(let i=0; i<columns.length; i++){
        let column: HTMLElement = columns[i];
        let columnDate = new Date(parseInt(column.getAttribute(this.dateAttribute)));
        let childNumber = this.childElementsNumber(unit, columnDate);
        let width = Math.trunc(column.offsetWidth / this._maxresolution);
        if(width > childNumber){
          let content: HTMLElement = <HTMLElement> column.querySelector('.' + this.timegridColContentClass);
          let innerContent = document.createElement('div');
          content.appendChild(innerContent);
          this.renderColumns(innerContent, childUnit, childNumber, level + 1);
        }
      }
    }

    target.classList.add(this.timegridRowClass);
    target.setAttribute(this.levelAttribute, '' + level);
    target.setAttribute(this.unitAttribute, '' + unit);
    target.setAttribute(this.dateAttribute, '' + currentDate.getTime());
  }

  private renderGridColumns(target: HTMLElement, rowsize: number, currentDate: Date, unit: TimeUnit, level: number) : HTMLElement[]{
    let columns: HTMLElement[] = [];
    for(let i=0; i < rowsize; i++){
      let column = document.createElement('div');
      target.appendChild(column);
      column.classList.add(this.timegridColClass);
      column.setAttribute(this.levelAttribute, '' + level);
      column.setAttribute(this.unitAttribute, '' + unit);
      column.setAttribute(this.dateAttribute, '' + currentDate.getTime());
      this.renderTimeGridColumn(column, currentDate, unit, level);
      columns.push(column);
      currentDate = DateUtils.increment(currentDate, unit);
    }
    return columns;
  }

  private renderTimeGridColumn(target:HTMLElement, date: Date, unit: TimeUnit, level: number){
    let isReference = level == 0 && DateUtils.trunc(this._date, this._unit).getTime() === DateUtils.trunc(date, this._unit).getTime();
    let contentCell = document.createElement('div');
    contentCell.classList.add(this.timegridColContentClass);
    contentCell.setAttribute(this.levelAttribute, '' + level);
    contentCell.setAttribute(this.unitAttribute, '' + unit);
    contentCell.setAttribute(this.dateAttribute, '' + date.getTime());
    contentCell.setAttribute(this.dateAttribute + '-formatted', '' + date);

    let labelCell = document.createElement('div');
    labelCell.classList.add(this.timegridColLabelClass);
    labelCell.setAttribute(this.levelAttribute, '' + level);
    labelCell.setAttribute(this.unitAttribute, '' + unit);
    labelCell.setAttribute(this.dateAttribute, '' + date.getTime());

    target.appendChild(contentCell);
    target.appendChild(labelCell);

    if(isReference){
      target.classList.add(this.timegridColReferenceClass);
      contentCell.classList.add(this.timegridColReferenceContentClass);
      labelCell.classList.add(this.timegridColReferenceLabelClass);
    }
  }

  private printLabel(labelCell: HTMLElement, date: Date, unit: TimeUnit, level: number, forcedPattern: string): string {
    switch(unit){
      case TimeUnit.MINUTE: return this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm'], forcedPattern);
      case TimeUnit.HOUR: return this.printLabelWithPatterns(labelCell, date, level, ['dd/MM hh:00', 'hh:00', 'hh'], forcedPattern);
      case TimeUnit.DAY: return this.printLabelWithPatterns(labelCell, date, level, ['dd-MM', 'dd/MM/yy', 'dd'], forcedPattern);
      case TimeUnit.WEEK: return this.printLabelWithPatterns(labelCell, date, level, ['dd/MM/yy', 'dd-MM', 'dd'], forcedPattern);
      case TimeUnit.MONTH: return this.printLabelWithPatterns(labelCell, date, level, ['MM-yyyy', 'MM'], forcedPattern);
      case TimeUnit.YEAR: return this.printLabelWithPatterns(labelCell, date, level, ['yyyy', 'yy'], forcedPattern);
    }
    return null;
  }

  private printLabelWithPatterns(labelCell: HTMLElement, date: Date, level: number, patterns:string[], forcedPattern: string): string{
    if(!forcedPattern){
      forcedPattern = this.searchAndApplyPattern(labelCell, date, level, patterns);
    } else {
      labelCell.innerHTML = DateUtils.formatDate(date, forcedPattern);;
    }
    return forcedPattern;
  }

  private searchAndApplyPattern(labelCell: HTMLElement, date: Date, level: number, patterns:string[]): string{
    if(level < patterns.length){
      let startWidth = labelCell.offsetWidth;
      patterns = patterns.sort((p1, p2) => p2.length - p1.length);
      let levelPatterns = patterns.splice(level, patterns.length - level);
      for(let i=0; i < levelPatterns.length; i++){
        let label = DateUtils.formatDate(date, levelPatterns[i]);
        labelCell.innerHTML = label;
        if(labelCell.offsetWidth < (startWidth + Math.trunc(startWidth * 0.1))){
          return levelPatterns[i];
        }
        labelCell.innerHTML = '';
      }
    }
    return null;
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

  private buildPeriodsRows(size: number){
    if(size && size > 0){
      let contentCells = document.querySelectorAll('.' + this.timegridColContentClass);
      for(let i=0; i<contentCells.length; i++){
        /*
        for(let row=0; row<size; row++){
          let rowCell = document.createElement('div');
          rowCell.classList.add(this.timegridRowCellClass);
          rowCell.classList.add(this.timegridRowCellClass + '-' + row);
        }
        */
      }
    }
  }
}
