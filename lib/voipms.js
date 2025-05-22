'use strict';

const axios = require('axios');

class Voipms {
  constructor(settings) {
    this.apiUsername = settings.apiUsername;
    this.apiPassword = settings.apiPassword;
    this.from = settings.from;
  }

  /**
   * Send an SMS message
   * @param {Object} msg - Message object: { to: '+15551234567', body: 'Hello!' }
   * @param {Function} cb - Callback function
   */
  send(msg, cb) {
    if (!msg.to || !msg.body) {
      return cb(new Error('Missing required fields: "to" and "body"'));
    }

    const params = {
      api_username: this.apiUsername,
      api_password: this.apiPassword,
      method: 'sendSMS',
      did: this.from,
      dst: msg.to.replace(/^\+1/, ''),
      message: msg.body
    };

    axios.get('https://voip.ms/api/v1/rest.php', { params })
      .then(response => {
        if (response.data.status === 'success') {
          cb(null, response.data);
        } else {
          cb(new Error(`VoIP.ms Error: ${response.data.status}`));
        }
      })
      .catch(err => cb(err));
  }
}

module.exports = Voipms;
