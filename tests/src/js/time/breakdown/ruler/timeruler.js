'use strict'

export class TimeRuler{
  constructor(timeunit, grads){
    this.timeunit = timeunit;
    this.gradients = grads;
  }

  get unit(){
    return this.timeunit;
  }

  get grads(){
    return [...this.gradients];
  }
}
