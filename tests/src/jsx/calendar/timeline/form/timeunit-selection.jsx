import * as React from 'react'
import PropTypes from 'prop-types';

const TimeUnitSelection = (props) => {
  return (
    <select onChange={props.handleChange} value={props.selected}>
      {
        props.options.map((item, i) => <option key={i} value={item}>{item}</option>)
      }
    </select>
  )
}

TimeUnitSelection.propTypes = {
    handleChange: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
};

export default TimeUnitSelection;
