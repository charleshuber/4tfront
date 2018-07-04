import {TimeRulerGradient} from "js/time/breakdown/ruler/gradient";
import {TimeUnit} from "js/time/timeunit";

export class TimeRuler {

  private timeunit: TimeUnit;
  private gradients;

  constructor(timeunit, grads) {
    this.timeunit = timeunit;
    this.gradients = grads;
  }

  get unit() {
    return this.timeunit;
  }

  get grads() {
    return [...this.gradients];
  }
}
