'usestrict'

import DU from '../dateutils.js'

export class TimeRange {

  constructor(start, end){
    this.start = start;
    this.end = end;
  }

  get seconds(){
    return DU.rangeAsSeconds(this.start, this.end);
  }
}
