import {TimeInterval} from "./timeinterval";

export class TimeIntervalService {

  public getTimeIntervals(): Promise<TimeInterval[]> {
    const date11 = new Date();
    const date12 = new Date();
    date11.setHours(date11.getHours() - 5);
    date12.setHours(date12.getHours() - 3);
    const t1 =  new TimeInterval(date11, date12);

    const date21 = new Date();
    const date22 = new Date();
    date21.setHours(date21.getHours() - 2);
    date22.setHours(date22.getHours() + 2);
    const t2 =  new TimeInterval(date21, date22);

    const date31 = new Date();
    const date32 = new Date();
    date31.setHours(date31.getHours() - 3);
    date32.setHours(date32.getHours() + 10);
    const t3 =  new TimeInterval(date31, date32);

    const date41 = new Date();
    const date42 = new Date();
    const t4 =  new TimeInterval(date41, date42);

    return new Promise((res) => {
      setTimeout(() => {
        res([t1, t2, t3, t4]);
      }, 500);
    });
  }
}
