const mongoose = require('mongoose');
const moment = require('moment');
const stringUtil = require('../lib/utils/string-util');
const address = require('./subdocuments/address');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    set: stringUtil.capitalize,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'productCategorySchema'
  },
  address: address,
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: Date
});
productSchema.pre('validate', function(next) {
  const product = this;
  if (!product.createdDate) {
    product.createdDate = moment.utc();
  }
  next();
});
productSchema.pre('save', function(next) {
  const product = this;
  product.modifiedDate = moment.utc();
  next();
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
