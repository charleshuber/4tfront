require('./timeline-calendar-frame.css')

import React from 'react'

import Timeline from './timeline.jsx'
import Ruler from './ruler.jsx'
import DU, {addToMoment} from '../../../js/time/dateutils.js'
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
    return (
      <div>
        <h1>Timeline Calendar Frame</h1>
        <div> Timeunit: {this.state.timeunit} - number: {this.state.unitnumber} - startDate: {this.startDateFormat} - endDate: {this.endDateFormat}</div>
        {/*
          https://www.sarasoueidan.com/blog/svg-coordinate-systems
          https://www.w3schools.com/graphics/svg_intro.asp
        */}
        <div className="svg-container">
          <svg version="1.1" viewBox="0 0 510 110" preserveAspectRatio="xMinYMin meet" className="svg-content">
            <Timeline position={1} startPoint={50} endPoint={150} color="red" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={2} startPoint={20} endPoint={40} color="blue" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={3} startPoint={90} endPoint={410} color="pink" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={4} startPoint={120} endPoint={390} color="purple" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Timeline position={5} startPoint={40} endPoint={500} color="brown" leftPaneWidth={viewBow.width.leftpane} height={viewBow.height.timeline} />
            <Ruler y={102} width={250} interval={2} timelineOffset={10}/>
          </svg>
        </div>
        <TimelineCalendarForm publish={this.handleFormChange}/>
      </div>
    )
  }
}