'use strict'

import {TimeUnit} from '../../timeunit.ts'
import {TimeBreakdown} from '../timebreakdown.js'

export class TimelineGraphicIndex {

  constructor(x_width, maxGradsNumber, {startDate, timeunit, unitnumber}){
    if(!(startDate && timeunit && unitnumber)){
      return null;
    }
    let rulerBD = new TimeBreakdown({startDate, timeunit, unitnumber}, maxGradsNumber);
    let x_factor = secondsRange => secondsRange * x_width / rulerBD.range.seconds
    Object.keys(TimeUnit).filter(timeunit => rulerBD[timeunit]).forEach(timeunit => {
      let timeUnitIndex = new Map();
      let tuRuler = rulerBD.get(timeunit);
      tuRuler.gradients.forEach(grad => {
        let x_position = x_factor(grad.seconds);
        timeUnitIndex.set(grad.date.valueOf(), {"moment":grad.date, "x_position":x_position});
      });
      let x_delta = 0;
      if(tuRuler.grads.length > 1){
        x_delta = x_factor(tuRuler.grads[1].seconds - tuRuler.grads[0].seconds)
      }
      this[timeunit] = {"timeunit": timeunit, "index": timeUnitIndex, "x_delta": x_delta};
    })
    this.timebreakdown = rulerBD;
    this.x_delta = x_factor(rulerBD.range.seconds);
  }

  getSmallerTimeUnitIndex(){
    let smallerTUIndex = null;
    Object.keys(TimeUnit)
    .filter(tu => this[tu] && this[tu].index)
    .forEach((tu) => {
        if(!smallerTUIndex || smallerTUIndex.size < this[tu].index.size){
          smallerTUIndex = this[tu];
        }
    })
    return smallerTUIndex;
  }

}
