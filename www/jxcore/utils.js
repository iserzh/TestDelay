'use strict';

var Promise = require('lie');
var log4js = require('log4js');
var logger = log4js.getLogger();
var stats = require('stats-lite');


module.exports.callParallel = function (object, method, n) {
  console.log('Call ' + method + ' ' + n + ' times in parallel mode');
  var arr = makeArray(n).map(function () {
    return object[method]();
  });
  return Promise.all(arr);
};

module.exports.callRow = function (object, method, n) {
  console.log('Call ' + method + ' ' + n + ' times in row mode');
  var times = [];
  var arr = makeArray(n).reduce(function (prev) {
    return prev.then(function (val) {
      if(val) {
        times.push(val);
      }
      return object[method]();
    });
  }, Promise.resolve());

  return arr.then(function () {
    return times;
  });
};

module.exports.logTime = function (requestsTime) {
  console.log(requestsTime.join('ms, ') + 'ms');
  console.log('Average time: ' + stats.mean(requestsTime) + 'ms');
  console.log('Median: ' + stats.median(requestsTime) + 'ms');
  console.log('Standard deviation: ' + stats.stdev(requestsTime) + 'ms');
};

function makeArray(length) {
  return Array.apply(null, new Array(length));
}
