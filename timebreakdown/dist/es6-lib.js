'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFive = exports.double = undefined;

var _sum = require('lodash/sum');

var _sum2 = _interopRequireDefault(_sum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var double = function double(number) {
  return number * 2;
};
var addFive = function addFive(number) {
  return (0, _sum2.default)([number, 5]);
};

exports.double = double;
exports.addFive = addFive;
