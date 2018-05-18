sum = require 'lodash/sum'

double = (number)-> number * 2
addFive = (number)-> sum([number, 5])

module.exports =
  double: double
  addFive: addFive
