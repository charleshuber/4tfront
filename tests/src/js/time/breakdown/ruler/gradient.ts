import {Moment} from "moment";

export class TimeRulerGradient {
  public date: Moment;
  public positionAsSeconds: number;

  constructor(date, positionAsSeconds) {
    this.date = date;
    this.positionAsSeconds = positionAsSeconds;
  }

  get seconds() {
    return this.positionAsSeconds;
  }
}
