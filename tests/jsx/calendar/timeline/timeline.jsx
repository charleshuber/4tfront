import React from 'react'

export default (props) => {
  let insideHeight = props.height - 1;
  let insideLeftPaneWidth = props.leftPaneWidth - 1;
  let timelineWidth = props.endPoint - props.startPoint;
  let y = (props.position - 1) * props.height;
  return (
    <g>
      <rect x="0" y={y} rx="1" ry="1" width={insideLeftPaneWidth} height={insideHeight} fill="rgb(120,120,120)" opacity="0.4"/>
      <text x={props.leftPaneWidth / 2} y={y + props.height / 2} fill="rgb(50,30,100)" textAnchor="middle" fontSize="7">+</text>
      <rect x={props.startPoint} y={y} rx="1" ry="1" width={timelineWidth} height={insideHeight} fill={props.color} opacity="0.4" />
    </g>
  )
}
