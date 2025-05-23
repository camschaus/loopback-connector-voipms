'use strict';

const assert = require('assert');
const axios = require('axios');

module.exports = VoipmsConnector;

function VoipmsConnector(settings) {
  assert(typeof settings === 'object', 'Cannot initialize VoipmsConnector without settings');

  this.apiUsername = settings.apiUsername;
  this.apiPassword = settings.apiPassword;
  this.from = settings.from;
}

VoipmsConnector.initialize = function (dataSource, callback) {
  dataSource.connector = new VoipmsConnector(dataSource.settings);
  dataSource.connector.dataSource = dataSource;
  callback();
};

VoipmsConnector.prototype.DataAccessObject = VoipmsDAO;

function VoipmsDAO() {}

VoipmsDAO.send = function (options, fn) {
  const dataSource = this.dataSource;
  const connector = dataSource.connector;

  if (!options.to || !options.body) {
    return fn(new Error('Missing required fields: "to" and "body"'));
  }

  const params = {
    api_username: connector.apiUsername,
    api_password: connector.apiPassword,
    method: 'sendSMS',
    did: connector.from,
    dst: options.to.replace(/^\+1/, ''),
    message: options.body
  };

  axios.get('https://voip.ms/api/v1/rest.php', { params })
    .then(response => {
      if (response.data.status === 'success') {
        fn(null, response.data);
      } else {
        fn(new Error(`VoIP.ms Error: ${response.data.status}`));
      }
    })
    .catch(err => fn(err));
};

VoipmsDAO.prototype.send = function (fn) {
  this.constructor.send(this, fn);
};

VoipmsConnector.client =
VoipmsConnector.prototype.client =
VoipmsDAO.client =
VoipmsDAO.prototype.client = null;
