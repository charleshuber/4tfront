import {Timeline} from "js/resources/timeline/timeline";
import {TimeUnit} from "js/time/timeunit";
import {Moment} from "moment";

export class TimelineCalendarFrameState {
  public startDate: Moment;
  public timeunit: TimeUnit;
  public unitnumber: number;
  public timelines: Timeline[];
}
