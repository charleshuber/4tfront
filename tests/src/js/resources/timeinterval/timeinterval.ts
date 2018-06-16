
export class TimeInterval {

  private startTime: Date;
  private endTime: Date;

  constructor(startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public getStartTime(): Date | null {
    if (this.startTime) {
      return new Date(this.startTime.getTime());
    }
    return null;
  }

  public getEndTime(): Date | null  {
    if (this.endTime) {
        return new Date(this.endTime.getTime());
    }
    return null;
  }
}
