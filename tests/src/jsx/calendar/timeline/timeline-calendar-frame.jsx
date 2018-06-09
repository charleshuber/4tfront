require('./timeline-calendar-frame.css')

import * as React from 'react';
import Timeline from './timeline.jsx'
import Ruler from './ruler.jsx'
import DU, {addToMoment} from '../../../js/time/dateutils.js'
import {TimeUnit} from '../../../js/time/timeunit.ts'
import {TimelineGraphicIndex} from '../../../js/time/breakdown/graphics/timeline-graphic-index.js'
import {TimeIntervalService} from '../../../js/resources/timeinterval/timeintervalService.js'
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
    let maxNumber = 400;
    let rulerIndex = new TimelineGraphicIndex(viewBow.width.timeline, maxNumber, this.state);
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
    rulers = Object.keys(TimeUnit)
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
    let moreAccurateIndex = rulerIndexs.getSmallerTimeUnitIndex();
    let displayedStartDate = rulerIndexs.timebreakdown.range.start;
    let displayedEndDate = rulerIndexs.timebreakdown.range.end;
    if(moreAccurateIndex){
      return intervals.map((ti,i) => {
        let tiStartDate = DU.roundDown(DU.dateToMoment(ti.startTime), moreAccurateIndex.timeunit);
        let tiEndDate = DU.roundUp(DU.dateToMoment(ti.endTime), moreAccurateIndex.timeunit);
        if(tiStartDate.isAfter(displayedEndDate) || tiEndDate.isBefore(displayedStartDate)){
          return (<Timeline key={i} position={i+1}
            startPoint={null} endPoint={null}
            color="white" leftPaneWidth={x_offset} height={height} />)
        }
        let startPoint = x_offset;
        if(tiStartDate.isAfter(displayedStartDate)){
          let startGraphicGradEntry = moreAccurateIndex.index.get(tiStartDate.valueOf());
          startPoint += startGraphicGradEntry.x_position;
        }

        if(tiEndDate.isSameOrAfter(displayedEndDate)){
          let length = moreAccurateIndex.index.size;
          let lastEntry = [...moreAccurateIndex.index.entries()][length - 1];
          let lastValue = lastEntry[1];
          tiEndDate = lastValue.moment;
        }
        let endGraphicGradEntry = moreAccurateIndex.index.get(tiEndDate.valueOf());
        let endPoint = endGraphicGradEntry.x_position + x_offset;
        return (<Timeline key={i} position={i+1}
          startPoint={startPoint} endPoint={endPoint}
          color="red" leftPaneWidth={x_offset} height={height} />)
      });
    }
  }
  return [];
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
