require('./timeline-calendar-frame.css')

import React from 'react'
import Timeline from './timeline.jsx'
import Ruler from './ruler.jsx'
import DU, {addToMoment} from '../../../js/time/dateutils.js'
import TimeUnit from '../../../js/time/timeunit.js'
import {TimeIntervalService} from '../../../js/resources//timeinterval/timeintervalService.js'
import {TimeInterval} from '../../../js/resources//timeinterval/timeinterval.js'
import {TimelineCalendarForm} from './form/timeline-calendar-form.jsx'

const viewBow = {
  width:{
    timeline:500,
    leftpane:10
  },
  height:{
    timeline:20,
    ruler:20
  }
}

export class TimelineCalendarFrame extends React.Component{

  constructor(props) {
    super(props)
    this.state = {}
    this.handleFormChange = this.handleFormChange.bind(this)
    this.tiService = new TimeIntervalService();
  }

  handleFormChange(formState){
    let startDate = formState.startDate;
    let endDate = this.computeEndDate(formState);
    this.tiService.getTimeIntervals(startDate, endDate)
    .then((intervals) => {
      formState.intervals = intervals;
      this.setState(formState);
    });
    this.setState(formState)
  }

  get startDateFormat(){
    if(this.state.startDate){
      return this.state.startDate.format();
    }
    return null;
  }

  get endDate(){
    return this.computeEndDate(this.state)
  }

  computeEndDate({startDate, timeunit, unitnumber}){
      return addToMoment(startDate, timeunit, unitnumber)
  }

  get endDateFormat(){
    let endDate = this.endDate
    if(endDate){
      return endDate.format();
    }
    return null;
  }

  render(){
    let viewBoxWidth = viewBow.width.timeline + viewBow.width.leftpane;
    let maxNumber = 366;
    let rulerIndex = computeRulerIndex(viewBow.width.timeline, maxNumber, this.state);
    let timelines = buildTimelines(rulerIndex, this.state.intervals, viewBow.width.leftpane, viewBow.height.timeline);
    let y_rulerPosition = viewBow.height.timeline * timelines.length + 1;
    let rulers = buildRulers(rulerIndex, maxNumber, viewBow.width.leftpane, y_rulerPosition);
    let viewbox = '0 0 ' + viewBoxWidth + ' ' + (y_rulerPosition + viewBow.height.ruler);
    return (
      <div>
        <h1>Timeline Calendar Frame Yop</h1>
        <div> Timeunit: {this.state.timeunit} - number: {this.state.unitnumber} - startDate: {this.startDateFormat} - endDate: {this.endDateFormat}</div>
        {/*
          https://www.sarasoueidan.com/blog/svg-coordinate-systems
          https://www.w3schools.com/graphics/svg_intro.asp
        */}
        <div className="svg-container">
          <svg version="1.1" viewBox={viewbox} preserveAspectRatio="xMinYMin meet" className="svg-content">
            {timelines}
            {rulers}
          </svg>
        </div>
        <TimelineCalendarForm publish={this.handleFormChange}/>
      </div>
    )
  }
}

function buildRulers(rulerIndexs, maxNumber, x_offset, y_offset){
  let rulers = [];
  if(rulerIndexs && maxNumber){
    rulers = TimeUnit.values
    .filter(tu => rulerIndexs[tu] && rulerIndexs[tu].index)
    .filter(tu => rulerIndexs[tu].index.size <= maxNumber)
    .map((tu, i) => {
        return <Ruler key={i}
          y={y_offset} x={x_offset}
          timeunit={tu}
          index={rulerIndexs[tu].index}
          height={(i+1) * 2}
          x_delta={rulerIndexs[tu].x_delta}
          color={rulersColor.get(tu)}/>
    })
  }
  return rulers;
}

function buildTimelines(rulerIndexs, intervals, x_offset, height){
  if(rulerIndexs && intervals){
    let deeperIndex = getDeeperInder(rulerIndexs);
    let displayedStartDate = rulerIndexs.timebreakdown.range.start;
    let displayedEndDate = rulerIndexs.timebreakdown.range.end;
    if(deeperIndex){
      return intervals.map((ti,i) => {
        let tiStartDate = DU.roundDown(DU.dateToMoment(ti.startTime), deeperIndex.timeunit);
        let tiEndDate = DU.roundUp(DU.dateToMoment(ti.endTime), deeperIndex.timeunit);
        if(tiStartDate.isAfter(displayedEndDate) || tiEndDate.isBefore(displayedStartDate)){
          return (<Timeline key={i} position={i+1} leftPaneWidth={x_offset} height={height} />)
        }
        if(tiStartDate.isSameOrBefore(displayedStartDate)){
          tiStartDate = displayedStartDate;
        }
        if(tiEndDate.isSameOrAfter(displayedEndDate)){
          tiEndDate = displayedEndDate;
        }
        let startPoint = deeperIndex.index.get(tiStartDate.valueOf()).x_position + x_offset;
        let endPoint = deeperIndex.index.get(tiEndDate.valueOf()).x_position + x_offset;
        return (<Timeline key={i} position={i+1}
          startPoint={startPoint} endPoint={endPoint}
          color="red" leftPaneWidth={x_offset} height={height} />)
      });
    }
  }
  return [];
}

function getDeeperInder(rulerIndexs){
  let deeperIndex = null;
  if(rulerIndexs){
    TimeUnit.values
    .filter(tu => rulerIndexs[tu] && rulerIndexs[tu].index)
    .forEach((tu) => {
        if(!deeperIndex || deeperIndex.size < rulerIndexs[tu].index.size){
          deeperIndex = rulerIndexs[tu];
        }
    })
  }
  return deeperIndex;
}

function computeRulerIndex(x_width, maxGradsNumber, {startDate, timeunit, unitnumber}){
  if(!(startDate && timeunit && unitnumber)){
    return null;
  }
  let rulerBD = rulerBreakDown({startDate, timeunit, unitnumber}, maxGradsNumber);
  let x_factor = secondsRange => secondsRange * x_width / rulerBD.range.seconds
  let rulerIndex = {};
  TimeUnit.values.filter(timeunit => rulerBD[timeunit]).forEach(timeunit => {
    let timeUnitIndex = new Map();
    let tuRuler = rulerBD[timeunit];
    tuRuler.grads.forEach(grad => {
      let x_position = x_factor(grad.seconds);
      timeUnitIndex.set(grad.date.valueOf(), {"moment":grad.date, "x_position":x_position});
    });
    let x_delta = 0;
    if(tuRuler.grads.length > 1){
      x_delta = x_factor(tuRuler.grads[1].seconds - tuRuler.grads[0].seconds)
    }
    rulerIndex[timeunit] = {"timeunit": timeunit, "index": timeUnitIndex, "x_delta": x_delta};
  })
  rulerIndex.timebreakdown = rulerBD;
  rulerIndex.x_delta = x_factor(rulerBD.range.seconds);
  return rulerIndex;
}

function rulerBreakDown({startDate, timeunit, unitnumber}, breakdownlimit){
  let result = {};
  //define the displayed dates range of the ruler
  let displayedRangeStart = DU.roundDown(startDate, timeunit);
  let displayedRangeEnd = DU.addToMoment(displayedRangeStart, timeunit, unitnumber)
  result.range = {
    start : displayedRangeStart,
    end : displayedRangeEnd,
    seconds : DU.rangeAsSeconds(displayedRangeStart, displayedRangeEnd)
  };
  result.unit = timeunit;
  TimeUnit.values.forEach((tu) => {

    //Be sure the start date of the unit is inside the dates range
    let currentDate = DU.roundUp(displayedRangeStart, tu)
    //Be sure the end date of the unit is outside the dates range
    let endDate = DU.roundUp(displayedRangeEnd, tu)
    if(DU.rangeAsUnit(startDate, endDate, tu) <= breakdownlimit){
      let tuRuler = {}
      tuRuler.unit = tu
      tuRuler.grads =  []
      while(currentDate.isSameOrBefore(endDate)){
        tuRuler.grads.push({
          date: currentDate,
          seconds : DU.rangeAsSeconds(displayedRangeStart, currentDate)
        });
        currentDate = DU.addToMoment(currentDate, tu, 1);
      }
      result[tu] = tuRuler
    }
  });
  return result;
}

let rulersColor = new Map();
rulersColor.set(TimeUnit.MINUTE, 'rgb(200,80,200)')
rulersColor.set(TimeUnit.MINUTES_5, 'rgb(210,60,210)')
rulersColor.set(TimeUnit.MINUTES_15, 'rgb(220,40,220)')
rulersColor.set(TimeUnit.HOUR, 'rgb(80,80,200)')
rulersColor.set(TimeUnit.DAY, 'rgb(80,200,200)')
rulersColor.set(TimeUnit.WEEK, 'rgb(80,200,80)')
rulersColor.set(TimeUnit.MONTH, 'rgb(200,200,80)')
rulersColor.set(TimeUnit.YEAR, 'rgb(200,80,80)')
