/*global require, module, applicationContext */
'use strict';

var apiKey = applicationContext.configuration.apiKey;
var request = require('org/arangodb/request');
var crypto = require('org/arangodb/crypto');
var util = require('util');

var data = require('./exports').schema.validate(applicationContext.argv[0]);
if (data.error) {
  throw data.error;
}

var response = request.post('https://api.postageapp.com/v.1.0/send_message.json', {
  body: {
    api_key: applicationContext.configuration.apiKey,
    uid: crypto.sha1(JSON.stringify(data.value)) + '.' + Date.now(),
    arguments: data.value
  },
  json: true,
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json'
  }
});
if (response.body) {
  if (response.body.response.status !== 'ok') {
    throw new Error(util.format(
      'Server returned status %s with message: %s',
      response.body.response.status,
      response.body.response.message
    ));
  }
} else if (Math.floor(response.statusCode / 100) !== 2) {
  throw new Error('Server sent an empty response with status ' + response.statusCode);
}

module.exports = response.body;
