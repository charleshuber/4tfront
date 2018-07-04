import {ITimelineProps} from "components/calendar/timeline/frame/timeline/timeline-props";
import * as React from "react";

export class Timeline extends React.Component<ITimelineProps, null> {

  constructor(props) {
    super(props);
  }

  public render() {
    const fontSize = 7;
    const insideHeight = this.props.height - 1;
    const insideLeftPaneWidth = this.props.leftPaneWidth - 1;
    const y = (this.props.position - 1) * this.props.height;
    let timeline = null;
    if (this.props.endPoint && this.props.startPoint) {
      const timelineWidth = this.props.endPoint - this.props.startPoint;
      timeline = (<rect
        x={this.props.startPoint} y={y}
        rx="1" ry="1"
        width={timelineWidth} height={insideHeight}
        fill={this.props.color} opacity="0.4" />);
    }
    return (
      <g>
        <rect
          x="0" y={y}
          rx="1" ry="1"
          width={insideLeftPaneWidth} height={insideHeight}
          fill="rgb(120,120,120)" opacity="0.4"/>
        <text x="0" y={y} fill="rgb(50,30,100)" textAnchor="middle" fontSize={fontSize}>
          <tspan dx="4.75" dy="11">+</tspan>
        </text>
        {timeline}
      </g>
    );
  }
}
