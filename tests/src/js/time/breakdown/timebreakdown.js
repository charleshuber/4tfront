'use strict'

import DU from '../dateutils.js'
import {TimeUnit} from '../timeunit.ts'
import {TimeRange} from './timerange.js'
import {TimeRuler} from './ruler/timeruler.js'
import {TimeRulerGradient} from './ruler/gradient.js'

export class TimeBreakdown {

  constructor({startDate, timeunit, unitnumber}, breakdownlimit){
    this.unit = timeunit;
    //define the boundary dates of the ruler
    let displayedRangeStart = DU.roundDown(startDate, timeunit);
    let displayedRangeEnd = DU.addToMoment(displayedRangeStart, timeunit, unitnumber)
    this.range = new TimeRange(displayedRangeStart, displayedRangeEnd);

    Object.keys(TimeUnit).forEach((tu) => {
      //Be sure the start date is inside the dates range
      let currentDate = DU.roundUp(displayedRangeStart, tu)
      //Be sure the end date of the unit is outside the dates range
      let endDate = DU.roundUp(displayedRangeEnd, tu)
      if(DU.rangeAsUnit(startDate, endDate, tu) <= breakdownlimit){
        let grads =  []
        while(currentDate.isSameOrBefore(endDate)){
          grads.push(new TimeRulerGradient(
            currentDate,
            DU.rangeAsSeconds(displayedRangeStart, currentDate)));
          currentDate = DU.addToMoment(currentDate, tu, 1);
        }
        this[tu] = new TimeRuler(tu, grads);
      }
    });
  }

  get(timeunit){
    return this[timeunit];
  }
}
