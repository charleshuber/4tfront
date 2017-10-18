import { TimeInterval } from '../rest/resources/time/timeinterval';

export class TimeIntervalInfo {
  private _interval: TimeInterval;
  private _color: string;
  private _label: string;

  constructor(interval: TimeInterval, color: string, label: string){
      this._interval = interval;
      this._color = color;
      this._label = label;
  }

  get interval(): TimeInterval{
    return this._interval;
  }
  get color(): string {
    return this._color
  }
  get label(): string {
    return this._label;
  }
}
