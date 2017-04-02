const mongoose = require('mongoose');
const stringUtil = require('../lib/utils/string-util');
const moment = require('moment');
const createError = require('http-errors');


const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    set: stringUtil.capitalize,
    unique: true
  },
  parentID: {
    type: Schema.Types.ObjectId
  },
  ancestorIDs: [{
    type: Schema.Types.ObjectId
  }],
  createdDate: {
    type: Date,
    required: true
  },
  modifiedDate: Date
}, {
  toJSON: {
    virtuals: true
  }
});

// Virtuals
productCategorySchema.virtual('parent', {
  ref: 'productCategory',
  localField: 'parentID',
  foreignField: '_id',
  justOne: true
});
productCategorySchema.virtual('ancestors', {
  ref: 'productCategory',
  localField: 'ancestorIDs',
  foreignField: '_id'
});
// Hooks
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


// Instance methods
productCategorySchema.methods.updateName = function(name) {
  if (typeof name === 'undefined') {
    return;
  } else if (name === null) {
    throw new createError.BadRequest();
  }
  this.name = name;
};

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategoryModel;