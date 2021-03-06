import {TimeUnit} from './timeunit';
import {Timerange} from './timerange';
import {DateUtils} from './dateutils';
import { TimeIntervalInfo } from './timeintervalinfo';
import { TimeInterval } from '../rest/resources/time/timeinterval';


export class GridBuilder {

  private labelCharWidth = 10;
  private indexAttribute = 'data-index';
  private dateAttribute = 'data-date';
  private unitAttribute = 'data-timeunit';
  private levelAttribute = 'data-level';
  private periodStartAttribute = 'data-start';
  private periodEndAttribute = 'data-end';
  private timegridRowClass = 'timegrid-row';
  private timegridColClass = 'timegrid-col';
  private timegridColReferenceClass = this.timegridColClass + '-reference';
  private timegridColContentClass = this.timegridColClass + '-content';
  private timegridColLabelClass = this.timegridColClass + '-label';
  private timegridColReferenceContentClass = this.timegridColReferenceClass + '-content';
  private timegridColReferenceLabelClass = this.timegridColReferenceClass + '-label';
  private timegridRowCellClass = 'timegrid-row-cell';
  private timegridPeriodLine = 'timegrid-period-line';

  private grid: HTMLElement = null;
  private _unit: TimeUnit;
  private _range: Timerange;
  private _start: Date;
  private _end: Date;
  private _date: Date;
  private _maxresolution: number;
  private _depth: number;
  private _unitDepth: TimeUnit;

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

  public printIntervals(intervals: TimeIntervalInfo[]){
    if(intervals && this.grid != null){
      this.buildPeriodsRows(intervals.length);
      this.buildIntervals(intervals);
    }
  }

  private renderRowGrid(parent:HTMLElement, unit: TimeUnit){
    this.emptyElement(parent);
    let row = document.createElement('div');
    parent.appendChild(row);

    let rowsize = 0;
    switch(unit){
      case TimeUnit.MINUTE: rowsize = this._range.asMinutes; break;
      case TimeUnit.MINUTES_5: rowsize = Math.ceil(this._range.asMinutes / 5); break;
      case TimeUnit.MINUTES_15: rowsize = Math.ceil(this._range.asMinutes / 15); break;
      case TimeUnit.HOUR: rowsize = this._range.asHours; break;
      case TimeUnit.DAY: rowsize = this._range.asDays; break;
      case TimeUnit.WEEK: rowsize = this._range.asWeeks; break;
      case TimeUnit.MONTH: rowsize = this._range.asMonths; break;
      case TimeUnit.YEAR: rowsize = this._range.asYears;
    }
    let truncatedStartDate: Date = DateUtils.trunc(this._start, this._unit);
    this.renderRowOfColumns(row, unit, rowsize, 0, truncatedStartDate);
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

  private renderRowOfColumns(target: HTMLElement, unit: TimeUnit, rowsize: number, level: number, startDate: Date) {

    //Be aware to apply css before rendering any child elements otherwise you will get errors in child width computation
    target.classList.add(this.timegridRowClass);
    target.setAttribute(this.levelAttribute, '' + level);
    target.setAttribute(this.unitAttribute, '' + unit);
    target.setAttribute(this.dateAttribute, '' + startDate.getTime());

    let columns: HTMLElement[] = this.renderColumns(target, rowsize, startDate, unit, level);

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
          this.renderRowOfColumns(innerContent, childUnit, childNumber, level + 1, columnDate);
        } else {
          this._depth = level;
          this._unitDepth = unit;
        }
      }
    } else {
      this._depth = level;
      this._unitDepth = unit;
    }
  }

  private renderColumns(target: HTMLElement, rowsize: number, currentDate: Date, unit: TimeUnit, level: number) : HTMLElement[]{
    let columns: HTMLElement[] = [];
    for(let i=0; i < rowsize; i++){
      let column = document.createElement('div');
      target.appendChild(column);
      column.classList.add(this.timegridColClass);
      column.setAttribute(this.levelAttribute, '' + level);
      column.setAttribute(this.unitAttribute, '' + unit);
      column.setAttribute(this.dateAttribute, '' + currentDate.getTime());
      column.setAttribute(this.dateAttribute + '-formatted', '' + currentDate);
      this.renderColumn(column, currentDate, unit, level);
      columns.push(column);
      currentDate = DateUtils.increment(currentDate, unit);
    }
    return columns;
  }

  private renderColumn(target:HTMLElement, date: Date, unit: TimeUnit, level: number){
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

    if(isReference){
      target.classList.add(this.timegridColReferenceClass);
      contentCell.classList.add(this.timegridColReferenceContentClass);
      labelCell.classList.add(this.timegridColReferenceLabelClass);
    }

    target.appendChild(contentCell);
    target.appendChild(labelCell);
  }

  private printLabel(labelCell: HTMLElement, date: Date, unit: TimeUnit, level: number, forcedPattern: string): string {
    switch(unit){
      case TimeUnit.MINUTE:
      case TimeUnit.MINUTES_5:
      case TimeUnit.MINUTES_15: return this.printLabelWithPatterns(labelCell, date, level, ['hh:mm', 'mm'], forcedPattern);
      case TimeUnit.HOUR: return this.printLabelWithPatterns(labelCell, date, level, ['dd/MM hh:00', 'hh'], forcedPattern);
      case TimeUnit.DAY: return this.printLabelWithPatterns(labelCell, date, level, ['llldd/MM/yy', 'llldd', 'lldd', 'ldd'], forcedPattern);
      case TimeUnit.WEEK: return this.printLabelWithPatterns(labelCell, date, level, ['ww', 'ww'], forcedPattern);
      case TimeUnit.MONTH: return this.printLabelWithPatterns(labelCell, date, level, ['MM-yyyy', 'MM'], forcedPattern);
      case TimeUnit.YEAR: return this.printLabelWithPatterns(labelCell, date, level, ['yyyy', 'yy'], forcedPattern);
    }
    return null;
  }

  private printLabelWithPatterns(labelCell: HTMLElement, date: Date, level: number, patterns:string[], forcedPattern: string): string{
    if(!forcedPattern){
      forcedPattern = this.searchAndApplyPattern(labelCell, date, level, patterns);
    } else {
      let labelSpan:HTMLElement = document.createElement('span');
      labelSpan.innerHTML = DateUtils.formatDate(date, forcedPattern);
      labelCell.appendChild(labelSpan);
    }
    return forcedPattern;
  }

  private searchAndApplyPattern(labelCell: HTMLElement, date: Date, level: number, patterns:string[]): string{
    if(level < patterns.length){
      let startWidth = labelCell.offsetWidth;
      patterns = patterns.sort((p1, p2) => p2.length - p1.length);
      let levelPatterns = patterns.splice(level, patterns.length - level);
      for(let i=0; i < levelPatterns.length; i++){
        let labelSpan:HTMLElement = document.createElement('span');
        labelSpan.innerHTML = DateUtils.formatDate(date, levelPatterns[i]);
        labelCell.appendChild(labelSpan);
        if(labelSpan.offsetWidth < startWidth){
          return levelPatterns[i];
        }
        labelSpan.remove();
      }
    }
    return null;
  }

  private childElementsNumber(unit: TimeUnit, date: Date){
    switch(unit){
      case TimeUnit.MINUTE: return 0; /*no child elements*/
      case TimeUnit.MINUTES_5: return 5; /*5 minutes*/
      case TimeUnit.MINUTES_15: return 3; /*3 x 5 minutes*/
      case TimeUnit.HOUR: return 4; /*4 quarters*/
      case TimeUnit.DAY: return 24; /*24 hours*/
      case TimeUnit.WEEK: return 7; /*7 days*/
      case TimeUnit.MONTH: return DateUtils.daysInMonth(date); /*28 to 31 days*/
      case TimeUnit.YEAR: return 12; /*12 months*/
    }
  }

  private child(unit: TimeUnit): TimeUnit{
    switch(unit){
      case TimeUnit.MINUTES_5: return TimeUnit.MINUTE;
      case TimeUnit.MINUTES_15: return TimeUnit.MINUTES_5;
      case TimeUnit.HOUR: return TimeUnit.MINUTES_15;
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
      let contentCells = document.querySelectorAll('.' + this.timegridColContentClass + '['+ this.levelAttribute +'="' + this._depth + '"]');
      for(let i=0; i<contentCells.length; i++){
        let contentCell = contentCells.item(i);
        for(let row=0; row<size; row++){
          let rowCell = document.createElement('div');
          rowCell.classList.add(this.timegridRowCellClass);
          rowCell.setAttribute(this.indexAttribute, '' + row);
          rowCell.setAttribute(this.dateAttribute, '' + contentCell.getAttribute(this.dateAttribute));
          rowCell.setAttribute(this.levelAttribute, '' + this._depth);
          contentCell.appendChild(rowCell);
        }
      }
    }
  }

  private buildIntervals(intervalsInfo: TimeIntervalInfo[]){
    for(let i=0; i<intervalsInfo.length; i++){
      let timeintervalinfo: TimeIntervalInfo = intervalsInfo[i];
      let timeinterval: TimeInterval = timeintervalinfo.interval;

      if(!this.isPrintableInterval(timeinterval)){
        continue;
      }

      let line: HTMLElement = document.createElement('div');
      line.classList.add(this.timegridPeriodLine);
      line.setAttribute(this.periodStartAttribute, '' + timeinterval.startTime.getTime());
      line.setAttribute(this.periodEndAttribute, '' + timeinterval.endTime.getTime());

      let startTime = timeinterval.startTime;
      if(this._start.getTime() > timeinterval.startTime.getTime()){
        startTime = this._start;
        line.classList.add('start-truncated');
      }

      let endTime = timeinterval.endTime;
      if(this._end.getTime() < timeinterval.endTime.getTime()){
        endTime = this._end;
        line.classList.add('end-truncated');
      }

      let start = DateUtils.trunc(startTime, this._unitDepth);
      let end = DateUtils.trunc(endTime, this._unitDepth);
      let indexRowCells = '.' + this.timegridRowCellClass + '['+ this.indexAttribute +'="' + i + '"]';

      let startCell: HTMLElement = <HTMLElement> document.querySelector(indexRowCells + '['+ this.dateAttribute +'="' + start.getTime() + '"]');
      let endCell: HTMLElement = <HTMLElement> document.querySelector(indexRowCells + '['+ this.dateAttribute +'="' + end.getTime() + '"]');

      if(endCell == null){
        let timeBeforeEnd = DateUtils.trunc(new Date(end.getTime() - 1), this._unitDepth);
        endCell = <HTMLElement> document.querySelector(indexRowCells + '['+ this.dateAttribute +'="' + timeBeforeEnd.getTime() + '"]');
      }

      startCell.appendChild(line);

      let endOfBeforeEndCell = endCell.offsetLeft + endCell.offsetWidth;
      let width: number = (endCell === startCell)? startCell.offsetWidth : endOfBeforeEndCell - startCell.offsetLeft;
      line.style.width = '' + width + 'px';
      if(timeintervalinfo.color && timeintervalinfo.color.length){
          line.style.backgroundColor = timeintervalinfo.color;
      }
      if(timeintervalinfo.label && timeintervalinfo.label.length){
        let span = document.createElement('span');
        span.innerHTML = timeintervalinfo.label
        +' <br><span style="font-size:0.7em">' + timeinterval.startTime + '</span>'
        +' <br><span style="font-size:0.7em">' + timeinterval.endTime + '</span>';
        line.appendChild(span);
      }
    }
  }

  private isPrintableInterval(interval: TimeInterval): boolean{
    if(this._start.getTime() >= interval.startTime.getTime() && this._end.getTime() <= interval.endTime.getTime()){
      return true;
    }
    let validStartTime: boolean = interval.startTime && this.isInInterval(interval.startTime);
    let validEndTime: boolean = interval.endTime && this.isInInterval(interval.endTime);
    return validStartTime || validEndTime;
  }

  private isInInterval(datetime: Date): boolean{
    let datetimemill = datetime.getTime();
    if(datetimemill >= this._start.getTime() &&  datetimemill <= this._end.getTime()){
      return true;
    }
    return false;
  }

}
