import moment from 'moment'
import TimeUnit from './timeunit';

//export let dayLabels = new Array('Dim','Lun','Mar','Mer','Jeu','Ven','Sam');

/*
  https://momentjs.com/docs/#/manipulating/
*/
export function addToMoment(moment, unit, number){
  if(moment){
    let endmoment = moment.clone()
    if(unit && number){
      switch(unit){
        case TimeUnit.YEAR:
          return endmoment.add(number, 'years')
        case TimeUnit.MONTH:
          return endmoment.add(number, 'months')
        case TimeUnit.WEEK:
          return endmoment.add(number, 'weeks')
        case TimeUnit.DAY:
          return endmoment.add(number, 'days')
        case TimeUnit.HOUR:
          return endmoment.add(number, 'hours')
        case TimeUnit.MINUTES_15:
          return endmoment.add(number * 15, 'minutes')
        case TimeUnit.MINUTES_5:
          return endmoment.add(number * 5, 'minutes')
        case TimeUnit.MINUTE:
          return endmoment.add(number, 'minutes')
      }
    }
    return endmoment;
  }
  return null;
}

export function getDuration(unit, number){
    if(unit && number){
      switch(unit){
        case TimeUnit.YEAR:
          return moment.duration(number, 'years')
        case TimeUnit.MONTH:
          return moment.duration(number, 'months')
        case TimeUnit.WEEK:
          return moment.duration(number, 'weeks')
        case TimeUnit.DAY:
          return moment.duration(number, 'days')
        case TimeUnit.HOUR:
          return moment.duration(number, 'hours')
        case TimeUnit.MINUTES_15:
          return moment.duration(number * 15, 'minutes')
        case TimeUnit.MINUTES_5:
          return moment.duration(number * 5, 'minutes')
        case TimeUnit.MINUTE:
          return moment.duration(number, 'minutes')
      }
    }
    return null;
}

export function rangeAsUnit(startDate, endDate, unit){
    if(startDate && endDate && unit){
      let duration = moment.duration(endDate.diff(startDate))
      switch(unit){
        case TimeUnit.YEAR:
          return duration.asYears()
        case TimeUnit.MONTH:
          return duration.asMonths()
        case TimeUnit.WEEK:
          return duration.asWeeks()
        case TimeUnit.DAY:
          return duration.asDays()
        case TimeUnit.HOUR:
          return duration.asHours()
        case TimeUnit.MINUTES_15:
          return duration.asMinutes() / 15
        case TimeUnit.MINUTES_5:
          return duration.asMinutes() / 5
        case TimeUnit.MINUTE:
          return duration.asMinutes()
      }
    }
    return null;
}

export function roundUp(moment, unit){
  if(moment && unit) {
    let truncated =  roundDown(moment, unit);
    if(truncated.isBefore(moment)){
      return addToMoment(truncated, unit, 1);
    }
    return truncated;
  }
  return null;
}

export function roundDown(moment, unit){
  if(unit && moment){
    let result = moment.clone()
    switch(unit){
      case TimeUnit.YEAR:
        return result.startOf('years')
      case TimeUnit.MONTH:
        return result.startOf('months')
      case TimeUnit.WEEK:
        return result.startOf('weeks')
      case TimeUnit.DAY:
        return result.startOf('days')
      case TimeUnit.HOUR:
        return result.startOf('hours')
      case TimeUnit.MINUTES_15:
        var quarter = parseInt(result.minutes() / 15)
        return result.minutes(quarter * 15).startOf('minutes')
      case TimeUnit.MINUTES_5:
        var quint = parseInt(result.minutes() / 5)
        return result.minutes(quint * 5).startOf('minutes')
      case TimeUnit.MINUTE:
        return result.startOf('minutes')
    }
    return result
  }
  return null;
}

export function formatUnit(moment, unit){
  if(unit && moment){
    switch(unit){
      case TimeUnit.YEAR:
        return moment.format('YYYY');
      case TimeUnit.MONTH:
        return moment.format('MMM')
      case TimeUnit.WEEK:
        return moment.format('WW')
      case TimeUnit.DAY:
        return moment.format('DD ddd')
      case TimeUnit.HOUR:
        return moment.format('HH') + 'h';
      case TimeUnit.MINUTES_15:
        return moment.format('mm')
      case TimeUnit.MINUTES_5:
      case TimeUnit.MINUTE:
    }
  }
  return null;
}

export function rangeAsSeconds(startDate, endDate){
  return moment.duration(endDate.diff(startDate)).asSeconds();
}

export function min(m1, m2){
  if(m1 && m2){
    return moment.min(m1,m2)
  }
  return null;
}

export function max(m1, m2){
  if(m1 && m2){
    return moment.max(m1,m2)
  }
  return null;
}

export function dateToMoment(date){
  return moment(date);
}

const DateUtils = {
  "addToMoment" : addToMoment,
  "getDuration" : getDuration,
  "roundDown" : roundDown,
  "roundUp" : roundUp,
  "rangeAsSeconds" : rangeAsSeconds,
  "rangeAsUnit" : rangeAsUnit,
  "formatUnit" : formatUnit,
  "dateToMoment" : dateToMoment
}

export default DateUtils
