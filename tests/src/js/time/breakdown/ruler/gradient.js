'use strict'

export class TimeRulerGradient {
  constructor(date, positionAsSeconds){
    this.date = date;
    this.positionAsSeconds = positionAsSeconds;
  }

  get seconds(){
    return this.positionAsSeconds;
  }
}
