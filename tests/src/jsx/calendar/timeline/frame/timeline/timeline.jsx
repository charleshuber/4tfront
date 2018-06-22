import * as React from 'react'
import PropTypes from 'prop-types';

export const Timeline = (props) => {
  let fontSize = 7;
  let insideHeight = props.height - 1;
  let insideLeftPaneWidth = props.leftPaneWidth - 1;
  let y = (props.position - 1) * props.height;
  let timeline = null;
  if(props.endPoint && props.startPoint){
    let timelineWidth = props.endPoint - props.startPoint;
    timeline = <rect x={props.startPoint} y={y} rx="1" ry="1" width={timelineWidth} height={insideHeight} fill={props.color} opacity="0.4" />;
  }
  return (
    <g>
      <rect x="0" y={y} rx="1" ry="1" width={insideLeftPaneWidth} height={insideHeight} fill="rgb(120,120,120)" opacity="0.4"/>
      <text x="0" y={y} fill="rgb(50,30,100)" textAnchor="middle" fontSize={fontSize}>
        <tspan dx="4.75" dy="11">+</tspan>
      </text>
      {timeline}
    </g>
  )
}

Timeline.propTypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    leftPaneWidth: PropTypes.number.isRequired,
    endPoint: PropTypes.number,
    startPoint: PropTypes.number,
    position: PropTypes.number.isRequired
};
