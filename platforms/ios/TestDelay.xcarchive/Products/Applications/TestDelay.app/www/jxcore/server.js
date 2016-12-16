'use strict';

var https = require('https');
var express = require('express');
var Promise = require('lie');
var bodyParser = require('body-parser');

var config = require('./config');

function Server() {
  this.app = express();

  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({
    extended: true
  }));


  this.app.get(config.PATH, function (req, res) {
    res.send(config.TEST_DATA);
  });

  this.app.post(config.PATH, function (req, res) {
    res.send(req.body);
  });

  return this;
}

Server.prototype.init = function () {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.server = https.createServer({
      ciphers: config.SUPPORTED_PSK_CIPHERS,
      pskCallback: function(id) {
        return id === config.PSK_ID ? config.PSK_KEY : null;
      }
    }, self.app)
    .listen(config.PORT, function(err) {
      if (err) {
        return reject(err);
      }
      return resolve(config.PORT);
    });
  });
};

Server.prototype.stop = function () {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.server.close(function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

Server.prototype.reload = function () {
  var self = this;
  return self.stop()
  .then(function () {
    return self.init();
  })
  .catch(function (err) {
    return err;
  });
};

module.exports = Server;
