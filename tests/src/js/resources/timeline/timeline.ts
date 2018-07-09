import {TimeInterval} from "js/resources/timeinterval/timeinterval";

export class Timeline {
    public intervals: TimeInterval[];
    public addition: boolean;
    public name: string;

    constructor(intervals: TimeInterval[], addition: boolean, name: string) {
      this.intervals = intervals;
      this.addition = addition;
      this.name = name;
    }
}
