import DU from "../dateutils";
import {TimeUnit} from "../timeunit";
import {TimeRulerGradient} from "./ruler/gradient";
import {TimeRuler} from "./ruler/timeruler";
import {TimeRange} from "./timerange";

export class TimeBreakdown {

  public unit: TimeUnit;
  public range: TimeRange;

  constructor({startDate, timeunit, unitnumber}, breakdownlimit: number) {

    // define the boundary dates of the ruler
    const displayedRangeStart = DU.roundDown(startDate, timeunit);
    const displayedRangeEnd = DU.addToMoment(displayedRangeStart, timeunit, unitnumber);
    this.unit = timeunit;
    this.range = new TimeRange(displayedRangeStart, displayedRangeEnd);

    Object.keys(TimeUnit).forEach((tu: TimeUnit) => {
      // Be sure the start date is inside the dates range
      let currentDate = DU.roundUp(displayedRangeStart, tu);
      // Be sure the end date of the unit is outside the dates range
      const endDate = DU.roundUp(displayedRangeEnd, tu);
      // get number of timeunit values between two dates
      const rangeAsUnit = DU.rangeAsUnit(startDate, endDate, tu);

      if (rangeAsUnit && rangeAsUnit <= breakdownlimit) {
        const grads: TimeRulerGradient[] =  [];
        while (currentDate.isSameOrBefore(endDate)) {
          grads.push(new TimeRulerGradient(
            currentDate,
            DU.rangeAsSeconds(displayedRangeStart, currentDate)));
          currentDate = DU.addToMoment(currentDate, tu, 1);
        }
        this[tu] = new TimeRuler(tu, grads);
      }
    });
  }

  public get(timeunit: TimeUnit): TimeRuler {
    return this[timeunit];
  }
}
