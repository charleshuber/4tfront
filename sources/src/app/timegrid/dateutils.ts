import {TimeUnit} from './timeunit';

export class DateUtils {

  public trunc(date: Date, unit: TimeUnit): Date{
    let newDate: Date = new Date(date.getTime());
    switch(unit){
      case TimeUnit.YEAR: newDate.setMonth(0);
      case TimeUnit.MONTH: newDate.setDate(1);
      case TimeUnit.WEEK: newDate.setDate(1);
      case TimeUnit.MINUTE: newDate.setMilliseconds(0);
    }
    return newDate;
  }

}
