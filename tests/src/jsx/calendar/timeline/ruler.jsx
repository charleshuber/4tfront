import React from 'react'
import PropTypes from 'prop-types';

const Ruler = (props) => {
  if(!valid(props)){
    return null;
  }
  let dashs = []
  let i=0
  let rulerMapping = (v, k) => {
    let x = v + props.x
    let handleMouseOver = function(){
      alert(k.format())
    }
    let handleMouseOut = function(){
      alert(k.format())
    }
    dashs.push(<line key={i++}
      x1={x} x2={x} y1={props.y} y2={props.y + props.height}
      stroke={props.color} strokeWidth={0.1 * props.height}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}/>)
  }
  props.index.forEach(rulerMapping)
  return <g>{dashs}</g>
}

function valid({index}){
  return true && index;
}

Ruler.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    index: PropTypes.instanceOf(Map).isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string
};

export default Ruler;
