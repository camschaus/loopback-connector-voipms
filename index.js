'use strict';

exports.initialize = function initializeDataSource(dataSource, callback) {
  const Voipms = require('./lib/voipms');
  const settings = dataSource.settings || {};

  dataSource.connector = new Voipms(settings);
  dataSource.connector.dataSource = dataSource;

  callback && callback();
};