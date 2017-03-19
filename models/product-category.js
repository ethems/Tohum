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
    ref: 'productCategory'
  },
  ancestors: [{
    type: Schema.Types.ObjectId,
    ref: 'productCategory'
  }],
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
  productCategory.name = productCategory.name.trim();
  productCategory.modifiedDate = moment.utc();
  next();
});


productCategorySchema.statics.findByIdAndPopulate = function(productCategoryId) {
  return this.findById(productCategoryId).populate({
    path: 'parent',
    model: 'ProductCategory'
  }).populate({
    path: 'ancestors',
    model: 'ProductCategory'
  });
};

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema);





module.exports = ProductCategoryModel;