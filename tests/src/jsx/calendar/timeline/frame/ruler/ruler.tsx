import {GradientXInfo} from "js/time/breakdown/graphics/gradientXinfo";
import DU from "js/time/dateutils";
import * as React from "react";
import {IRulerProps} from "./ruler-props";

export class Ruler extends React.Component<IRulerProps, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    if (!valid(this.props)) {
      return null;
    }
    return (
      <g>
        <g>{buildGrads(this.props)}</g>
        <g>{buildLabels(this.props)}</g>
      </g>);
  }
}

function buildGrads(args: IRulerProps) {
  const grads = [];
  let i = 0;
  args.index.forEach((v: GradientXInfo) => {
    const xCoord = v.xPosition + args.x;
    const yCoord = args.y;
    grads.push(<line key={i++}
      x1={xCoord} x2={xCoord} y1={args.y} y2={yCoord + args.height}
      stroke={args.color} strokeWidth={0.1 * args.height}/>);
  });
  return grads;
}

function buildLabels(args: IRulerProps) {
  const labels = [];
  let i = 0;
  if (args.xDelta >= 10) {
    args.index.forEach((v: GradientXInfo) => {
      const xCoord = v.xPosition + args.x + 1;
      const yCoord = args.y + 1.8 * args.height;
      labels.push(<text key={i++}
        x={xCoord} y={yCoord} fontSize="4"
        fill={args.color} fontWeight={100 * args.height}>{DU.formatUnit(v.moment, args.timeunit)}</text>);
    });
  }
  return labels;
}

function valid(args: IRulerProps) {
  return true && args.index;
}
