/// <reference path="lodash.d.ts" />
import * as _ from 'lodash';

const double = (value: number)=> value * 2
const addFive = (value: number)=> _.sum([value, 5])

export = {
  double,
  addFive
}

