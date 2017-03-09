const mongoose = require('mongoose');
const stringUtil = require('../lib/utils/string-util');
const moment = require('moment');

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    set: stringUtil.capitalize,
    unique: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'productCategorySchema'
  },
  ancestors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'productCategorySchema'
    }
  ],
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: Date
});

productCategorySchema.pre('validate', function(next) {
  const productCategory = this;
  if (!productCategory.createdDate) {
    productCategory.createdDate = moment.utc();
  }
  next();
});
productCategorySchema.pre('save', function(next) {
  const productCategory = this;
  productCategory.modifiedDate = moment.utc();
  next();
});

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategoryModel;
