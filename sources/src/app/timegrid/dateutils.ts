import {TimeUnit} from './timeunit';

export module DateUtils {

  export function trunc(date: Date, unit: TimeUnit): Date{
    let newDate: Date = new Date(date.getTime());
    switch(unit){
      case TimeUnit.YEAR: newDate.setMonth(0);
      case TimeUnit.MONTH: newDate.setDate(1);
      case TimeUnit.WEEK:
      case TimeUnit.DAY: newDate.setHours(0);
      case TimeUnit.HOUR: newDate.setMinutes(0);
      case TimeUnit.MINUTE:
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
    }
    return newDate;
  }

}
