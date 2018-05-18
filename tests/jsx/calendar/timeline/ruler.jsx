import React from 'react'
import TimeUnit from '../../../js/time/timeunit';
import DU from '../../../js/time/dateutils.js'

export default (props) => {
  if(!valid(props)){
    return null;
  }
  let dashs = []
  let i=0
  let rulerMapping = (v, k, map) => {
    let height = 3;
    dashs.push(<line key={i++} x1={v} x2={v} y1={props.y} y2={props.y + height} stroke="rgb(120,120,120)" strokeWidth="0.2" />)
  }
  props.index.forEach(rulerMapping)
  return <g>
    {dashs}
  </g>;
}

function valid({index}){
  return true && index;
}

function computeRulerInfo(maxNumber, {startDate, timeunit, unitnumber}){
  let result = {};
  let duration = DU.getDuration(timeunit, unitnumber)
  if(Math.ceil(duration.asMinutes()) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asMinutes());
    result.firstUnit = TimeUnit.MINUTE;
  }
  else if(Math.ceil(duration.asMinutes() / 5) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asMinutes() / 5);
    result.firstUnit = TimeUnit.MINUTES_5;
  }
  else if(Math.ceil(duration.asMinutes() / 15) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asMinutes() / 15);
    result.firstUnit = TimeUnit.MINUTES_15;
  }
  else if(Math.ceil(duration.asHours()) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asHours());
    result.firstUnit = TimeUnit.HOUR;
  }
  else if(Math.ceil(duration.asDays()) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asDays());
    result.firstUnit = TimeUnit.DAY;
  }
  else if(Math.ceil(duration.asWeeks()) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asWeeks());
    result.firstUnit = TimeUnit.WEEK;
  }
  else if(Math.ceil(duration.asMonths()) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asMonths());
    result.firstUnit = TimeUnit.MONTH;
  }
  else if(Math.ceil(duration.asYears()) <= maxNumber){
    result.firstUnitNumber = Math.ceil(duration.asYears());
    result.firstUnit = TimeUnit.YEAR;
  }
  result.duration = duration;
  return result;
}
