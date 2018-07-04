import {TimeInterval} from "js/resources/timeinterval/timeinterval";
import {TimeUnit} from "js/time/timeunit";
import {Moment} from "moment";

export class TimelineCalendarFrameState {
  public startDate: Moment;
  public timeunit: TimeUnit;
  public unitnumber: number;
  public intervals: TimeInterval[];
}
