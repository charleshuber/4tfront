import {TimeInterval} from "js/resources/timeinterval/timeinterval";
import {Timeline} from "js/resources/timeline/timeline";
import {Moment} from "moment";
export class TimelineService {

  public getTimelines(startDate: Moment, endDate: Moment): Promise<Timeline[]> {
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

    const timelines = [
      new Timeline([t1], true, "timeline1"),
      new Timeline([t1, t2], false, "timeline2"),
      new Timeline([t1, t3], true, "timeline3"),
      new Timeline([t1, t4], true, "timeline4"),
    ];

    return new Promise((res) => {
      setTimeout(() => {
        res(timelines);
      }, 500);
    });
  }
}
