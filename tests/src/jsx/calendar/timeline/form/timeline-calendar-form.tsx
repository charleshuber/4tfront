import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";

import * as moment from "moment";
import Slider from "rc-slider";
import * as React from "react";
import DatePicker from "react-datepicker";
import {TimeUnit} from "../../../../js/time/timeunit";
import {ITimelineCalendarFormProps} from "./timeline-calendar-form-props";
import {TimelineCalendarFormState} from "./timeline-calendar-form-state";
import {TimeUnitSelection} from "./timeunit-selection";

export class TimelineCalendarForm
  extends React.Component<ITimelineCalendarFormProps, TimelineCalendarFormState> {

  constructor(props) {
    super(props);
    const timeunit = TimeUnit.MINUTES_15;
    this.state = new TimelineCalendarFormState(timeunit, moment(), 1);
    this.handleTimeunitSelection = this.handleTimeunitSelection.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  public componentDidMount() {
    this.publish({});
  }

  public render() {
    const timeunits: TimeUnit[] = Object.keys(TimeUnit).map((v: TimeUnit) => v);
    return (
    <form>
      <fieldset>
        <div>
          <TimeUnitSelection
            selected={this.state.timeunit}
            options={timeunits}
            handleChange={this.handleTimeunitSelection}/>
        </div>
        <div>
          <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange}/>
        </div>
        <div>
          <Slider defaultValue={this.state.unitnumber} onChange={this.handleSliderChange}/>
        </div>
      </fieldset>
    </form>
  );
  }

  private handleTimeunitSelection(event: React.FormEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value;
    this.notify({
      timeunit : value,
    });
  }

  private handleStartDateChange(date) {
    this.notify({
      startDate : date,
    });
  }

  private handleSliderChange(value) {
    this.notify({
      unitnumber : value,
    });
  }

  private notify(values) {
    this.setState(values);
    this.publish(values);
  }

  private publish(
    {timeunit = this.state.timeunit, startDate = this.state.startDate, unitnumber = this.state.unitnumber}:
    {timeunit?: TimeUnit | undefined, startDate?: moment.Moment | undefined, unitnumber?: number | undefined}) {
    if (this.props.publish) {
      this.props.publish({startDate, timeunit, unitnumber});
    }
  }
}
