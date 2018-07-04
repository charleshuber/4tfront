import {TimeIntervalService} from "js/resources/timeinterval/timeintervalService";
import {TimeUnit} from "js/time/timeunit";

export interface ITimelineCalendarFrameProps {
  leftPaneWidth: number;
  timelineWidth: number;
  timelineHeight: number;
  rulerHeight: number;
  timeIntervalService: TimeIntervalService;
}
