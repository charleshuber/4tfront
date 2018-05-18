import React from 'react'
import TimeUnit from '../../../js/time/timeunit';
import DU from '../../../js/time/dateutils.js'

export default (props) => {
  if(!valid(props)){
    return null;
  }
  let maxNumber = 250;
  let rulerInfo = computeRulerInfo(maxNumber, props)
  let interval = props.width / rulerInfo.firstUnitNumber;
  let rulerMapping = (num, i) => {
    let position = num * interval + props.timelineOffset;
    let isKeyPosition = (num * interval) % 100 === 0;
    let litteHeight = 3;
    let bigHeight = 5;
    let littleYEnd = props.y + litteHeight;
    let bigYEnd = props.y + bigHeight;
    return <line key={i} x1={position} y1={props.y} x2={position} y2={isKeyPosition ? bigYEnd:littleYEnd} stroke="rgb(120,120,120)" strokeWidth="0.2" />
  }
  return [...Array(rulerInfo.firstUnitNumber-1).keys()].map(num => num+1).map(rulerMapping)
}

function valid({startDate, timeunit, unitnumber, width}){
  return startDate && timeunit && unitnumber && width;
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
