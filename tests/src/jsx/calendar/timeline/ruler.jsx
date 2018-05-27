import React from 'react'
import PropTypes from 'prop-types';

const Ruler = (props) => {
  if(!valid(props)){
    return null;
  }
  return (
    <g>
      <g>{buildGrads(props)}</g>
      <g>{buildLabels(props)}</g>
    </g>)
}

function buildGrads(props){
  let grads = []
  let i=0
  props.index.forEach((v, k) => {
    let x = v + props.x
    let handleMouseOver = function(){
      console.log(k.format())
    }
    let handleMouseOut = function(){
      console.log(k.format())
    }
    grads.push(<line key={i++}
      x1={x} x2={x} y1={props.y} y2={props.y + props.height}
      stroke={props.color} strokeWidth={0.1 * props.height}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}/>)
  });
  return grads;
}

function buildLabels(props){
  let labels = []
  let i=0
  if(props.x_delta >= 10){
    props.index.forEach((v,k) => {
      let x = v + props.x
      labels.push(<text key={i++}
        x={x} y={props.y + props.height + 4 } fontSize="4" fill={props.color}>{k.format("DD/MM/YYYY")}</text>)
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
    index: PropTypes.instanceOf(Map).isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string
};

export default Ruler;
