import {TimeUnit} from './timeunit';

export namespace DateUtils {

  export function trunc(date: Date, unit: TimeUnit): Date{
    let newDate: Date = new Date(date.getTime());
    switch(unit){
      case TimeUnit.YEAR: newDate.setMonth(0);
      case TimeUnit.MONTH:
      case TimeUnit.WEEK:
      if(unit == TimeUnit.MONTH){
        newDate.setDate(1);
      } else {
        newDate = truncToMonday(newDate);
      }
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
      case TimeUnit.HOUR: newDate.setHours(date.getHours() + 1); break;
      case TimeUnit.MINUTE: newDate.setMinutes(date.getMinutes() + 1);
    }
    return newDate;
  }

  export function formatDate(date: Date, pattern: string): string{
    let minPattern = pattern.replace(/mm/g, '' + on2Digits(date.getMinutes()));
    let hrPattern = minPattern.replace(/hh/g, '' + on2Digits(date.getHours()));
    let dyPattern = hrPattern.replace(/dd/g, '' + on2Digits(date.getDate()));
    let wkPattern = dyPattern.replace(/ww/g, '' + on2Digits(getWeekNumber(date)));
    let mtPattern = wkPattern.replace(/MM/g, '' + on2Digits(date.getMonth() + 1));
    let fullYearPattern = mtPattern.replace(/yyyy/g, '' + date.getFullYear());
    let yearPattern = fullYearPattern.replace(/yy/g, '' + truncFullYear(date));
    return yearPattern;
  }

  function truncToMonday(date: Date): Date{
    let newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() - date.getDay() + 1);
    return newDate;
  }

  /* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(date: Date) {
    // Copy date so don't modify original
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (date.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

  function on2Digits(digit: number): string{
    return digit < 10 ? '0' + digit : '' + digit;
  }

  function truncFullYear(date: Date): string{
    let fullyear: string = '' + date.getFullYear();
    return fullyear.substring(fullyear.length - 2, fullyear.length);
  }
}
