import {TimeUnit} from "js/time/timeunit";
import * as React from "react";
import {ITimeunitSelectionProps} from "./itimeunit-selection-props";

export class TimeUnitSelection extends React.Component<ITimeunitSelectionProps, any> {

  constructor(props) {
    super(props);
  }

  public render() {
    const options = this.props.options.map((item: TimeUnit, i) => <option key={i} value={item}>{item}</option>);
    return (
      <select onChange={this.props.handleChange} value={this.props.selected}>
        {options}
      </select>
    );
  }
}
