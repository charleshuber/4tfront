import {TimeUnit} from './timeunit';

export namespace DateUtils {

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

  export function increment(date: Date, unit: TimeUnit): Date{
    let newDate: Date = new Date(date.getTime());
    switch(unit){
      case TimeUnit.YEAR: newDate.setFullYear(date.getFullYear() + 1); break;
      case TimeUnit.MONTH: newDate.setMonth(date.getMonth() + 1); break;
      case TimeUnit.WEEK: newDate.setDate(date.getDate() + 8); break;
      case TimeUnit.DAY: newDate.setDate(date.getDate() + 1); break;
      case TimeUnit.HOUR: newDate.setHours(date.getHours() + 1);
      case TimeUnit.MINUTE: newDate.setMinutes(date.getMinutes() + 1);
    }
    return newDate;
  }

  export function formatDate(date: Date, pattern: string): string{
    let minPattern = pattern.replace(/mm/g, '' + on2Digits(date.getMinutes()));
    let hrPattern = pattern.replace(/hh/g, '' + on2Digits(date.getHours()));
    let dyPattern = pattern.replace(/dd/g, '' + on2Digits(date.getDate()));
    let wkPattern = pattern.replace(/ww/g, '' + on2Digits(date.getDate()));
    let mtPattern = pattern.replace(/MM/g, '' + on2Digits(date.getMonth() + 1));
    let fullYearPattern = pattern.replace(/yyyy/g, '' + date.getFullYear());
    let yearPattern = pattern.replace(/yy/g, '' + truncFullYear(date));
    return yearPattern;
  }

  function on2Digits(digit: number): string{
    return digit < 10 ? '0' + digit : '' + digit;
  }

  function truncFullYear(date: Date): string{
    let fullyear: string = '' + date.getFullYear();
    return fullyear.substring(fullyear.length - 2, fullyear.length);
  }
}
