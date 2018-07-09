import {ITimelineItv} from "components/calendar/timeline/frame/timeline/timeline-interval";

export interface ITimelineProps {
  intervals: ITimelineItv[];
  color: string;
  height: number;
  leftPaneWidth: number;
  position: number;
}
