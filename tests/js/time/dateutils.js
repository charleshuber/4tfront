import moment from 'moment'
import TimeUnit from './timeunit';

export let dayLabels = new Array('Dim','Lun','Mar','Mer','Jeu','Ven','Sam');

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

const DateUtils = {
  "addToMoment" : addToMoment,
  "getDuration" : getDuration
}

export default DateUtils
