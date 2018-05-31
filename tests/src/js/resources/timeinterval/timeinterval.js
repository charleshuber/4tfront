export class TimeInterval{

  constructor(startTime, endTime){
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getStartTime(){
    if(this.startTime)
      return new Date(this.startTime.getTime());
    return null;
  }

  getEndTime(){
    if(this.endTime)
      return new Date(this.endTime.getTime());
    return null;
  }
}
