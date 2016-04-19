'use strict';

const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const restrictToSender = require('./restrict-to-sender');
const process = require('./process');
const globalHooks = require('../../../hooks');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [process()],
  update: [hooks.remove('sentBy'), restrictToSender()],
  patch: [hooks.remove('sentBy'), restrictToSender()],
  remove: [restrictToSender()]
};

exports.after = {
  all: [hooks.populate('sentBy', { service: 'users', field: 'id' })], // Populate the sender
  find: [hooks.populate('sentBy', { service: 'users', field: 'id' })],
  get: [hooks.populate('sentBy', { service: 'users',  field: 'id' })],
  create: [hooks.populate('sentBy', { service: 'users', field: 'id' })],
  update: [],
  patch: [],
  remove: []
};