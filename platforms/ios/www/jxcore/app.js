'use strict';

var Client = require('./client');
var Server = require('./server');
var log4js = require('log4js');
var logger = log4js.getLogger();

var config = require('./config');
var utils = require('./utils');

var client = new Client(config.CONNECTION_TYPES.HTTPS);
var server = new Server();

server.init()
.then(function (port) {
  console.log('Express server is started. (port: ' + port + ')');
  return utils.callRow(client, 'get', 50);
})
.then(function (times) {
  utils.logTime(times);
  return utils.callParallel(client, 'get', 5);
})
.then(function (times) {
  utils.logTime(times);
  return utils.callParallel(client, 'get', 10);
})
.then(function (times) {
  utils.logTime(times);
  return utils.callParallel(client, 'get', 15);
})
.then(function (times) {
  utils.logTime(times);
  return process.exit();
})
.catch(function(e) {
  logger.fatal('EXIT with ' + e);
});
