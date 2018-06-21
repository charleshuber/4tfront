import * as moment from "moment";
import {TimeUnit} from "./timeunit";

/*
  https://momentjs.com/docs/#/manipulating/
*/
export function addToMoment(
  mom: moment.Moment,
  unit: TimeUnit,
  num: number): moment.Moment {
  if (mom) {
    const endmoment = mom.clone();
    if (unit && num) {
      switch (unit) {
        case TimeUnit.YEAR:
          return endmoment.add(num, "years");
        case TimeUnit.MONTH:
          return endmoment.add(num, "months");
        case TimeUnit.WEEK:
          return endmoment.add(num, "weeks");
        case TimeUnit.DAY:
          return endmoment.add(num, "days");
        case TimeUnit.HOUR:
          return endmoment.add(num, "hours");
        case TimeUnit.MINUTES_15:
          return endmoment.add(num * 15, "minutes");
        case TimeUnit.MINUTES_5:
          return endmoment.add(num * 5, "minutes");
        case TimeUnit.MINUTE:
          return endmoment.add(num, "minutes");
      }
    }
    return endmoment;
  }
  return null;
}

export function getDuration(
  unit: TimeUnit, num: number): moment.Duration {
    if (unit && num) {
      switch (unit) {
        case TimeUnit.YEAR:
          return moment.duration(num, "years");
        case TimeUnit.MONTH:
          return moment.duration(num, "months");
        case TimeUnit.WEEK:
          return moment.duration(num, "weeks");
        case TimeUnit.DAY:
          return moment.duration(num, "days");
        case TimeUnit.HOUR:
          return moment.duration(num, "hours");
        case TimeUnit.MINUTES_15:
          return moment.duration(num * 15, "minutes");
        case TimeUnit.MINUTES_5:
          return moment.duration(num * 5, "minutes");
        case TimeUnit.MINUTE:
          return moment.duration(num, "minutes");
      }
    }
    return null;
}

export function rangeAsUnit(
  startDate: moment.Moment,
  endDate: moment.Moment,
  unit: TimeUnit): number {
    if (startDate && endDate && unit) {
      const duration = moment.duration(endDate.diff(startDate));
      switch (unit) {
        case TimeUnit.YEAR:
          return duration.asYears();
        case TimeUnit.MONTH:
          return duration.asMonths();
        case TimeUnit.WEEK:
          return duration.asWeeks();
        case TimeUnit.DAY:
          return duration.asDays();
        case TimeUnit.HOUR:
          return duration.asHours();
        case TimeUnit.MINUTES_15:
          return duration.asMinutes() / 15;
        case TimeUnit.MINUTES_5:
          return duration.asMinutes() / 5;
        case TimeUnit.MINUTE:
          return duration.asMinutes();
      }
    }
    return null;
}

export function roundUp(
  mom: moment.Moment,
  unit: TimeUnit): moment.Moment {
  if (mom && unit) {
    const truncated =  roundDown(mom, unit);
    if (truncated.isBefore(mom)) {
      return addToMoment(truncated, unit, 1);
    }
    return truncated;
  }
  return null;
}

export function roundDown(
  mom: moment.Moment,
  unit: TimeUnit): moment.Moment {
  if (unit && mom) {
    const result = mom.clone();
    switch (unit) {
      case TimeUnit.YEAR:
        return result.startOf("years");
      case TimeUnit.MONTH:
        return result.startOf("months");
      case TimeUnit.WEEK:
        return result.startOf("weeks");
      case TimeUnit.DAY:
        return result.startOf("days");
      case TimeUnit.HOUR:
        return result.startOf("hours");
      case TimeUnit.MINUTES_15:
        const quarter = Math.floor(result.minutes() / 15);
        return result.minutes(quarter * 15).startOf("minutes");
      case TimeUnit.MINUTES_5:
        const quint = Math.floor(result.minutes() / 5);
        return result.minutes(quint * 5).startOf("minutes");
      case TimeUnit.MINUTE:
        return result.startOf("minutes");
    }
    return result;
  }
  return null;
}

export function formatUnit(
  mom: moment.Moment,
  unit: TimeUnit): string {
  if (unit && mom) {
    switch (unit) {
      case TimeUnit.YEAR:
        return mom.format("YYYY");
      case TimeUnit.MONTH:
        return mom.format("MMM");
      case TimeUnit.WEEK:
        return mom.format("WW");
      case TimeUnit.DAY:
        return mom.format("DD ddd");
      case TimeUnit.HOUR:
        return mom.format("HH") + "h";
      case TimeUnit.MINUTES_15:
        return mom.format("mm");
      case TimeUnit.MINUTES_5:
      case TimeUnit.MINUTE:
    }
  }
  return null;
}

export function rangeAsSeconds(
  startDate: moment.Moment,
  endDate: moment.Moment): number {
  return moment.duration(endDate.diff(startDate)).asSeconds();
}

export function min(
  m1: moment.Moment,
  m2: moment.Moment): moment.Moment {
  if (m1 && m2) {
    return moment.min(m1, m2);
  }
  return null;
}

export function max(
  m1: moment.Moment,
  m2: moment.Moment): moment.Moment {
  if (m1 && m2) {
    return moment.max(m1, m2);
  }
  return null;
}

export function dateToMoment(
  date: Date): moment.Moment {
  return moment(date);
}

const DateUtils = {
  addToMoment,
  dateToMoment,
  formatUnit,
  getDuration,
  rangeAsSeconds,
  rangeAsUnit,
  roundDown,
  roundUp,
};

export default DateUtils;
