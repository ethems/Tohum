const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  streetLine1: {
    type: String,
    required: true
  },
  streetLine2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String
  },
  state: String,
  country: {
    type: String,
    default: 'Turkey'
  },
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: Date
});

addressSchema.pre('validate', function(next) {
  const address = this;
  if (!address.createdDate) {
    address.createdDate = moment.utc();
  }
  next();
});
addressSchema.pre('save', function(next) {
  const address = this;
  address.modifiedDate = moment.utc();
  next();
});

module.exports = addressSchema;
