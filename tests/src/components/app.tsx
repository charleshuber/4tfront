import {TimelineCalendarFrame} from "components/calendar/timeline/frame/timeline-calendar-frame";
import {TimelineService} from "js/resources/timeline/timeline-service";
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(<TimelineCalendarFrame
  leftPaneWidth={20}
  timelineWidth={500}
  timelineHeight={20}
  rulerHeight={20}
  timelineService={new TimelineService()} />, document.getElementById("app"));
