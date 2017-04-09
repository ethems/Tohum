const mongoose = require('mongoose');
const moment = require('moment');
const createError = require('http-errors');

// This model is for security purpose
// Highly inspared by Pluralsight.com Node security

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  identityKey: {
    type: String,
    required: true,
    unique: true
  },
  failedAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  timeout: {
    type: Date,
    required: true,
    default: moment.utc()
  },
  inProgress: {
    type: Boolean
  },
  createDate: {
    type: Date,
    // expires after 5 min
    expires: 60 * 5,
    default: moment.utc()
  }
});

loginSchema.static('canAuthenticate', async function(key) {
  const login = await this.findOne({
    identityKey: key
  }).exec();

  if (!login || login.failedAttempts < 5) {
    return true;
  }

  const timeout = (moment.utc() - moment(login.timeout).add(1, 'm'));
  if (timeout >= 0) {
    await login.remove();
    return true;
  }
  return false;
});

loginSchema.static('failedLoginAttempt', async function(key) {
  const query = {
    identityKey: key
  };
  const update = {
    $inc: {
      failedAttempts: 1
    },
    timeout: moment.utc(),
    inProgress: false
  };
  const options = {
    setDefaultsOnInsert: true,
    upsert: true
  };
  await this.findOneAndUpdate(query, update, options).exec();
});

loginSchema.static('successfulLoginAttempt', async function(key) {
  const login = await this.findOne({
    identityKey: key
  }).exec();
  if (login) {
    await login.remove();
  }
});

loginSchema.static('inProgress', async function(key) {
  const login = await this.findOne({
    identityKey: key
  }).exec();
  const query = {
    identityKey: key
  };
  const update = {
    inProgress: true
  };
  const options = {
    setDefaultsOnInsert: true,
    upsert: true
  };
  await this.findOneAndUpdate(query, update, options).exec();
  return (login && login.inProgress);
});


const LoginModel = mongoose.model('Login', loginSchema);

module.exports = LoginModel;