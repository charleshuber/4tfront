import {TimeInterval} from './timeinterval.js'

export class TimeIntervalService {

  getTimeIntervals(startDate, endDate){
    let date11 = new Date();
    let date12 = new Date();
    date11.setHours(date11.getHours()-5);
    date12.setHours(date12.getHours()-3);
    let t1 =  new TimeInterval(date11, date12);

    let date21 = new Date();
    let date22 = new Date();
    date21.setHours(date21.getHours()-2);
    date22.setHours(date22.getHours()+2);
    let t2 =  new TimeInterval(date21, date22);

    let date31 = new Date();
    let date32 = new Date();
    date31.setHours(date31.getHours()-3);
    date32.setHours(date32.getHours()+10);
    let t3 =  new TimeInterval(date31, date32);

    let date41 = new Date();
    let date42 = new Date();
    let t4 =  new TimeInterval(date41, date42);

    return new Promise((res) => {
      setTimeout(() => {
        res([t1,t2,t3,t4])
      },500);
    });
  }
}
