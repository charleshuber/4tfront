import {GradientXInfo} from "js/time/breakdown/graphics/gradientXinfo";
import {TimeUnitIndexXInfo} from "js/time/breakdown/graphics/timeunit-index-graphic-info";
import {TimeBreakdown} from "js/time/breakdown/timebreakdown";
import {TimeUnit} from "js/time/timeunit";
import {Moment} from "moment";

export class TimelineGraphicIndex {

  public timebreakdown: TimeBreakdown;
  public xDelta: number;
  public indexMap: Map<TimeUnit, TimeUnitIndexXInfo> = new Map();

  constructor(
      xWidth: number,
      maxGradsNumber: number,
      startDate: Moment,
      timeunit: TimeUnit,
      unitnumber: number) {

    const rulerBD = new TimeBreakdown(startDate, timeunit, unitnumber, maxGradsNumber);
    const xFactor = (secondsRange) => secondsRange * xWidth / rulerBD.range.seconds;

    Object.keys(TimeUnit).filter((tu) => rulerBD[tu]).forEach((tu: TimeUnit) => {
      const timeUnitIndex = new Map<number, GradientXInfo>();
      const tuRuler = rulerBD.get(tu);
      tuRuler.grads.forEach((grad) => {
        const xPosition = xFactor(grad.seconds);
        timeUnitIndex.set(grad.date.valueOf(), new GradientXInfo(grad.date, xPosition));
      });
      let xDelta = 0;
      if (tuRuler.grads.length > 1) {
        xDelta = xFactor(tuRuler.grads[1].seconds - tuRuler.grads[0].seconds);
      }
      this.indexMap.set(tu, new TimeUnitIndexXInfo(tu, timeUnitIndex, xDelta));
    });
    this.timebreakdown = rulerBD;
    this.xDelta = xFactor(rulerBD.range.seconds);
  }

  public getSmallerTimeUnitIndex(): TimeUnitIndexXInfo | null {
    let smallerTUIndex: TimeUnitIndexXInfo | null = null;
    Object.keys(TimeUnit)
    .map((tu: TimeUnit) => this.indexMap.get(tu))
    .filter((tuXInfo: TimeUnitIndexXInfo) => tuXInfo)
    .forEach((tuXInfo: TimeUnitIndexXInfo) => {
        if (!smallerTUIndex || smallerTUIndex.index.size < tuXInfo.index.size) {
          smallerTUIndex = tuXInfo;
        }
    });
    return smallerTUIndex;
  }

}
