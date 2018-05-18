require('./timeline-calendar-frame.css')

import React from 'react'

import Timeline from './timeline.jsx'
import Ruler from './ruler.jsx'
import DU, {addToMoment} from '../../../js/time/dateutils.js'
import TimeUnit from '../../../js/time/timeunit.js'
import {TimelineCalendarForm} from './form/timeline-calendar-form.jsx'

const viewBow = {
  width:{
    timeline:500,
    leftpane:10
  },
  height:{
    timeline:20
  }
}

export class TimelineCalendarFrame extends React.Component{

  constructor(props) {
    super(props)
    this.state = {}
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(formState){
    this.setState(formState)
  }

  get startDateFormat(){
    if(this.state.startDate){
      return this.state.startDate.format();
    }
    return null;
  }

  get endDate(){
    return addToMoment(this.state.startDate, this.state.timeunit, this.state.unitnumber)
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
    let viewbox = '0 0 ' + viewBoxWidth + ' 110'
    let maxNumber = 250;
    let rulerIndex = computeRulerIndex(viewBow.width.timeline, viewBow.width.leftpane, maxNumber, this.state)
    return (
      <div>
        <h1>Timeline Calendar Frame</h1>
        <div> Timeunit: {this.state.timeunit} - number: {this.state.unitnumber} - startDate: {this.startDateFormat} - endDate: {this.endDateFormat}</div>
        {/*
          https://www.sarasoueidan.com/blog/svg-coordinate-systems
          https://www.w3schools.com/graphics/svg_intro.asp
        */}
        <div className="svg-container">
          <svg version="1.1" viewBox={viewbox} preserveAspectRatio="xMinYMin meet" className="svg-content">
            <Timeline position={1} startPoint={50} endPoint={150} color="red" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={2} startPoint={20} endPoint={40} color="blue" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={3} startPoint={90} endPoint={410} color="pink" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={4} startPoint={120} endPoint={390} color="purple" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={5} startPoint={40} endPoint={500} color="brown" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Ruler y={102} width={viewBow.width.timeline} timelineOffset={viewBow.width.leftpane}
              startDate={this.state.startDate}
              timeunit={this.state.timeunit}
              unitnumber={this.state.unitnumber}/>
          </svg>
        </div>
        <TimelineCalendarForm publish={this.handleFormChange}/>
      </div>
    )
  }
}

function computeRulerIndex(y_width, offset, maxNumber, {startDate, timeunit, unitnumber}){
  if(!(startDate && timeunit && unitnumber)){
    return null;
  }
  let rulerInfo = computeRulerInfo(maxNumber, timeunit, unitnumber);
  let rulerIndex = {};
  TimeUnit.values.filter(timeunit => rulerInfo[timeunit]).forEach(timeunit => {
      let timeInitIndex = new Map();
      let number = rulerInfo[timeunit];
      let y_interval = y_width / number;
      for(let i=0; i<=number; i++){
        let keyMoment = addToMoment(startDate, timeunit, number * i);
        timeInitIndex.set(keyMoment, offset + y_interval * i);
      }
      rulerIndex[timeunit] = timeInitIndex;
  })
  return rulerIndex;
}

function computeRulerInfo(maxNumber, timeunit, unitnumber){
  let result = {};
  let duration = DU.getDuration(timeunit, unitnumber);
  if(Math.ceil(duration.asMinutes()) <= maxNumber){
    result[TimeUnit.MINUTE] = Math.ceil(duration.asMinutes());
  }
  if(Math.ceil(duration.asMinutes() / 5) <= maxNumber){
    result[TimeUnit.MINUTES_5] = Math.ceil(duration.asMinutes() / 5);
  }
  if(Math.ceil(duration.asMinutes() / 15) <= maxNumber){
    result[TimeUnit.MINUTES_15] = Math.ceil(duration.asMinutes() / 15);
  }
  if(Math.ceil(duration.asHours()) <= maxNumber){
    result[TimeUnit.HOUR] = Math.ceil(duration.asHours());
  }
  if(Math.ceil(duration.asDays()) <= maxNumber){
    result[TimeUnit.DAY] = Math.ceil(duration.asDays());
  }
  if(Math.ceil(duration.asWeeks()) <= maxNumber){
    result[TimeUnit.WEEK] = Math.ceil(duration.asWeeks());
  }
  if(Math.ceil(duration.asMonths()) <= maxNumber){
    result[TimeUnit.MONTH] = Math.ceil(duration.asMonths());
  }
  if(Math.ceil(duration.asYears()) <= maxNumber){
    result[TimeUnit.YEAR] = Math.ceil(duration.asYears());
  }
  result.duration = duration;
  return result;
}
