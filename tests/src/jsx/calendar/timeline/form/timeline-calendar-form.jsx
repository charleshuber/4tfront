import React from 'react'
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker'
import Slider from 'rc-slider';
import moment from 'moment'
import TimeUnitSelection from './timeunit-selection.jsx'
import TimeUnit from '../../../../js/time/timeunit.js'

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-slider/assets/index.css';

export class TimelineCalendarForm extends React.Component {

  constructor(props){
    super(props)
    let timeunit = TimeUnit.YEAR;
    this.state = {
      timeunit: timeunit,
      startDate: moment(),
      unitnumber : 1
    };
    this.handleTimeunitSelection = this.handleTimeunitSelection.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentDidMount(){
    this.publish({})
  }

  handleTimeunitSelection(event){
    let value = event.target.value
    this.notify({
      timeunit : value
    });
  }

  handleStartDateChange(date) {
    this.notify({
      startDate : date
    });
  }

  handleSliderChange(value) {
    this.notify({
      unitnumber : value
    });
  }

  notify(values){
    this.setState(values)
    this.publish(values)
  }

  publish({
    timeunit = this.state.timeunit,
    startDate = this.state.startDate,
    unitnumber = this.state.unitnumber}){
    let values = {
      timeunit : timeunit,
      startDate : startDate,
      unitnumber : unitnumber
    }
    if(this.props.publish){
      this.props.publish(values)
    }
  }

  render(){
    return (
    <form>
      <fieldset>
        <div>
          <TimeUnitSelection selected={this.state.timeunit} options={TimeUnit.values} handleChange={this.handleTimeunitSelection}/>
        </div>
        <div>
          <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange}/>
        </div>
        <div>
          <Slider defaultValue={this.state.unitnumber} onChange={this.handleSliderChange}/>
        </div>
      </fieldset>
    </form>
    )
  }
}

TimelineCalendarForm.propTypes = {
    publish: PropTypes.func.isRequired
};
