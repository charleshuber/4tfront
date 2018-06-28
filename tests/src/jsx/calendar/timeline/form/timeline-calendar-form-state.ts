import {Moment} from "moment";
import {TimeUnit} from "../../../../js/time/timeunit";

export class TimelineCalendarFormState {
  public timeunit: TimeUnit;
  public startDate: Moment;
  public unitnumber: number;

  constructor(timeunit: TimeUnit, startDate: Moment, unitnumber: number) {
    this.timeunit = timeunit;
    this.startDate = startDate;
    this.unitnumber = unitnumber;
  }
}
