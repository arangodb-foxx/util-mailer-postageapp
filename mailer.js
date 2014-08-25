/*jshint indent: 2, nomen: true, maxlen: 120 */
/*global require, exports, applicationContext */
var queues = require('org/arangodb/foxx').queues,
  internal = require('internal');

queues.registerJobType(applicationContext.configuration.jobType, {
  maxFailures: applicationContext.configuration.maxFailures,
  execute: function (data) {
    'use strict';
    var response, body;
    response = internal.download(
      'https://api.postageapp.com/v.1.0/send_message.json',
      JSON.stringify({
        api_key: applicationContext.configuration.apiKey,
        uid: internal.sha1(JSON.stringify(data)) + '.' + Date.now(),
        arguments: data
      }),
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      }
    );
    if (response.body) {
      body = JSON.parse(response.body);
      if (body.response.status !== 'ok') {
        throw new Error(
          'Server returned status ' +
          body.response.status +
          ' with message: ' +
          body.response.message
        );
      }
      return body;
    } else if (Math.floor(response.code / 100) !== 2) {
      throw new Error('Server sent an empty response with status ' + response.code);
    }
  }
});

Object.defineProperty(exports, 'jobType', {
  get: function () {
    'use strict';
    return applicationContext.configuration.jobType;
  },
  configurable: false,
  enumerable: true
});