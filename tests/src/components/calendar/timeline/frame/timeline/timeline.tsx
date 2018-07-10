import {ITimelineItv} from "components/calendar/timeline/frame/timeline/timeline-interval";
import {ITimelineProps} from "components/calendar/timeline/frame/timeline/timeline-props";
import * as React from "react";

export class TimelineCP extends React.Component<ITimelineProps, null> {

  constructor(props) {
    super(props);
  }

  public render() {
    const fontSize = 7;
    const cellsMargin = 1;
    const cellsMarginDelta = cellsMargin * 2;
    const timelineHeight = this.props.height - 1;
    const insideHeight = timelineHeight - cellsMarginDelta;
    const insideLeftPaneWidth = this.props.leftPaneWidth - cellsMarginDelta;
    const leftPaneColor = this.props.addition ? "rgb(60, 190, 80)" : "rgb(200, 30, 50)";
    const y = (this.props.position - 1) * this.props.height;
    const insideY = y + cellsMargin;
    const timeintervals = buildIntervals(this.props.intervals, insideY, insideHeight, this.props.color);
    return (
      <g>
        <rect
          x="0" y={y}
          rx="0" ry="0"
          width="100%" height={timelineHeight}
          fill="rgb(240,240,255)" opacity="1"/>
        <rect
          x={cellsMargin} y={insideY}
          rx="1" ry="1"
          width={insideLeftPaneWidth} height={insideHeight}
          fill={leftPaneColor} opacity="1"/>
        <text x="0" y={y} fill="white" textAnchor="middle" fontSize={fontSize}>
          <tspan dx="4.75" dy="11">+</tspan>
        </text>
        <g>
          {timeintervals}
        </g>
      </g>
    );
  }
}

function buildIntervals(intervals: ITimelineItv[], yPosition: number, height: number, color: string) {
  const timeintervals = [];
  if (intervals && intervals.length > 0) {
    let key = 1;
    intervals.forEach((itv: ITimelineItv) => {
        if (itv && itv.startPoint && itv.endPoint) {
            timeintervals.push(buildInterval(key++, itv.startPoint, itv.endPoint, yPosition, height, color));
        }
    });
  }
  return timeintervals;
}

function buildInterval(
  key: number, startPoint: number, endPoint: number, yPosition: number, height: number, color: string) {
  const timelineWidth = endPoint - startPoint;
  return (<rect
    key={key}
    x={startPoint} y={yPosition}
    rx="1" ry="1"
    width={timelineWidth} height={height}
    fill={color} opacity="0.4" />);
}
