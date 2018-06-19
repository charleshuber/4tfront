import * as React from "react";
import PropTypes from 'prop-types'
import DU from '../../../js/time/dateutils.js'

export const Ruler = (props) => {
  if(!valid(props)){
    return null;
  }
  return (
    <g>
      <g>{buildGrads(props)}</g>
      <g>{buildLabels(props)}</g>
    </g>)
}

function buildGrads({index, x, y, height, color}){
  let grads = []
  let i=0
  index.forEach((v) => {
    let x_coord = v.x_position + x;
    let y_coord = y;
    grads.push(<line key={i++}
      x1={x_coord} x2={x_coord} y1={y} y2={y_coord + height}
      stroke={color} strokeWidth={0.1 * height}/>)
  });
  return grads;
}

function buildLabels({x_delta, index, x, y, height, color, timeunit}){
  let labels = []
  let i=0
  if(x_delta >= 10){
    index.forEach((v) => {
      let x_coord = v.x_position + x + 1;
      let y_coord = y + 1.8 * height;
      labels.push(<text key={i++}
        x={x_coord} y={y_coord} fontSize="4"
        fill={color} fontWeight={100 * height}>{DU.formatUnit(v.moment, timeunit)}</text>)
    });
  }
  return labels;
}

function valid({index}){
  return true && index;
}

Ruler.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    timeunit: PropTypes.string.isRequired,
    index: PropTypes.instanceOf(Map).isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string
};
