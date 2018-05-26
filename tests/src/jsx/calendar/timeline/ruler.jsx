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
    let handleMouseOver = function(){
      alert(k.format())
    }
    let handleMouseOut = function(){
      alert(k.format())
    }
    dashs.push(<line key={i++}
      x1={v} x2={v} y1={props.y} y2={props.y + height}
      stroke={props.color} strokeWidth="0.5"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}/>)
  }
  props.index.forEach(rulerMapping)
  return <g>{dashs}</g>
}

function valid({index}){
  return true && index;
}
