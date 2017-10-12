export enum TimeUnit {
  MINUTE = 101,
  MINUTES_5 = 105,
  MINUTES_15 = 115,
  HOUR = 201,
  DAY = 301 ,
  WEEK = 401,
  MONTH = 501,
  YEAR = 601
}

export namespace TimeUnitUtils {
    export function toString(unit: TimeUnit) {
        return TimeUnit[unit];
    }

    export function parse(unit: string):TimeUnit {
        return TimeUnit[unit];
    }

    /*
    export function parse(unit: number): TimeUnit{
      switch(unit){
        case 1: return TimeUnit.MINUTE;
        case 2: return TimeUnit.HOUR;
        case 3: return TimeUnit.DAY;
        case 4: return TimeUnit.WEEK;
        case 5: return TimeUnit.MONTH;
        case 6: return TimeUnit.YEAR;
      }
      return null;
    }
    */
}
