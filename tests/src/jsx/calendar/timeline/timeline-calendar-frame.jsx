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
    let rulerIndex = computeRulerIndex(viewBow.width.timeline, maxNumber, this.state)
    let rulers = [];
    if(rulerIndex){
      rulers = TimeUnit.values
      .filter(tu => rulerIndex[tu])
      .filter(tu => rulerIndex[tu].size <= maxNumber)
      .map((tu, i) => <Ruler key={i} y={102 + i * 3} index={rulerIndex[tu]} color={rulersColor.get(tu)}/>)
    }

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
            <Timeline position={1} startPoint={50} endPoint={150} color="red" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={2} startPoint={20} endPoint={40} color="blue" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={3} startPoint={90} endPoint={410} color="pink" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={4} startPoint={120} endPoint={390} color="purple" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={5} startPoint={40} endPoint={500} color="brown" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            {rulers}
          </svg>
        </div>
        <TimelineCalendarForm publish={this.handleFormChange}/>
      </div>
    )
  }
}

function computeRulerIndex(x_width, maxGradsNumber, {startDate, timeunit, unitnumber}){
  if(!(startDate && timeunit && unitnumber)){
    return null;
  }
  let rulerBD = rulerBreakDown(startDate, timeunit, unitnumber, maxGradsNumber);
  let x_factor = secondsRange => secondsRange * x_width / rulerBD.range.seconds
  let rulerIndex = {};
  TimeUnit.values.filter(timeunit => rulerBD[timeunit]).forEach(timeunit => {
    let timeUnitIndex = new Map();
    let tuRuler = rulerBD[timeunit];
    tuRuler.grads.forEach(grad => {
      let x_interval = x_factor(grad.seconds);
      timeUnitIndex.set(grad.date, x_interval);
    });
    rulerIndex[timeunit] = timeUnitIndex;
  })
  return rulerIndex;
}

function rulerBreakDown(startDate, reftimeunit, refunitnumber, breakdownlimit){
  let result = {};
  //define the displayed dates range of the ruler
  let displayedRangeStart = DU.roundDown(startDate, reftimeunit);
  let displayedRangeEnd = DU.addToMoment(displayedRangeStart, reftimeunit, refunitnumber)
  result.range = {
    start : displayedRangeStart,
    end : displayedRangeEnd,
    seconds : DU.rangeAsSeconds(displayedRangeStart, displayedRangeEnd)
  };
  result.unit = reftimeunit;
  TimeUnit.values.forEach((tu) => {

    //Be sure the start date of the unit is inside the dates range
    let currentDate = DU.roundUp(displayedRangeStart, tu)
    //Be sure the end date of the unit is outside the dates range
    let endDate = DU.roundUp(displayedRangeEnd, tu)
    if(DU.rangeAsUnit(startDate, endDate, tu) <= breakdownlimit){
      let tuRuler = {}
      tuRuler.unit = tu
      tuRuler.grads =  []
      while(currentDate.isBefore(endDate)){
        currentDate = DU.addToMoment(currentDate, tu, 1);
        tuRuler.grads.push({
          date: currentDate,
          seconds : DU.rangeAsSeconds(displayedRangeStart, currentDate)
        });
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
rulersColor.set(TimeUnit.WEEK, 'rgb(200,200,80)')
rulersColor.set(TimeUnit.YEAR, 'rgb(200,80,80)')
