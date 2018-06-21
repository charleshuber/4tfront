import {Moment} from "moment";
import DU from "../dateutils";

export class TimeRange {

  public start: Moment;
  public end: Moment;

  constructor(start: Moment, end: Moment) {
    this.start = start;
    this.end = end;
  }

  get seconds(): number {
    return DU.rangeAsSeconds(this.start, this.end);
  }
}
