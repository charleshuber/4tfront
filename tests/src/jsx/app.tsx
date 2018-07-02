import {TimeIntervalService} from "js/resources/timeinterval/timeintervalService";
import {TimelineCalendarFrame} from "jsx/calendar/timeline/frame/timeline-calendar-frame";
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<TimelineCalendarFrame
  leftPaneWidth={20}
  timelineWidth={500}
  timelineHeight={20}
  rulerHeight={20}
  timeIntervalService={new TimeIntervalService()} />, document.getElementById("app"));
