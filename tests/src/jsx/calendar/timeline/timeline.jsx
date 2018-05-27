import React from 'react'
import PropTypes from 'prop-types';

const Timeline = (props) => {
  let fontSize = 7;
  let insideHeight = props.height - 1;
  let insideLeftPaneWidth = props.leftPaneWidth - 1;
  let timelineWidth = props.endPoint - props.startPoint;
  let y = (props.position - 1) * props.height;
  return (
    <g>
      <rect x="0" y={y} rx="1" ry="1" width={insideLeftPaneWidth} height={insideHeight} fill="rgb(120,120,120)" opacity="0.4"/>
      <text x="0" y={y} fill="rgb(50,30,100)" textAnchor="middle" fontSize={fontSize}>
        <tspan dx="4.75" dy="11">+</tspan>
      </text>
      <rect x={props.startPoint} y={y} rx="1" ry="1" width={timelineWidth} height={insideHeight} fill={props.color} opacity="0.4" />
    </g>
  )
}

Timeline.propTypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    leftPaneWidth: PropTypes.number.isRequired,
    endPoint: PropTypes.number.isRequired,
    startPoint: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
};

export default Timeline
