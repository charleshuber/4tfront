import React from 'react'

export default (props) => {
  let rulerMapping = (num, i) => {
    let position = num * props.interval + props.timelineOffset;
    let isKeyPosition = (num * props.interval) % 100 === 0;
    let litteHeight = 3;
    let bigHeight = 5;
    let littleYEnd = props.y + litteHeight;
    let bigYEnd = props.y + bigHeight;
    return <line key={i} x1={position} y1={props.y} x2={position} y2={isKeyPosition ? bigYEnd:littleYEnd} stroke="rgb(120,120,120)" strokeWidth="0.2" />
  }
  return [...Array(props.width-1).keys()].map(num => num+1).map(rulerMapping)
}
