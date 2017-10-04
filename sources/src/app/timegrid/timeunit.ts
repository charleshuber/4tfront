export enum TimeUnit {
  MINUTE = 1,
  HOUR = 2,
  DAY = 3 ,
  WEEK = 4,
  MONTH = 5,
  YEAR = 6
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
