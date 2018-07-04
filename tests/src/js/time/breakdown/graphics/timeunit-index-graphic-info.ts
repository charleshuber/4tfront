import {GradientXInfo} from "js/time/breakdown/graphics/gradientXinfo";
import {TimeUnit} from "js/time/timeunit";

export class TimeUnitIndexXInfo {
  public timeunit: TimeUnit;
  public index: Map<number, GradientXInfo>;
  public xDelta: number;

  constructor(timeunit: TimeUnit, index: Map<number, GradientXInfo>, xDelta: number) {
    this.timeunit = timeunit;
    this.index = index;
    this.xDelta = xDelta;
  }
}
