import {TimeUnit} from "../../timeunit";
import {TimeRulerGradient} from "./gradient";

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
