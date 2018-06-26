import {Moment} from "moment";

export class GradientXInfo {
  public moment: Moment;
  public xPosition: number;

  constructor(moment: Moment, xPosition: number) {
    this.moment = moment;
    this.xPosition = xPosition;
  }
}
