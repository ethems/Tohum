const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true
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
  ]
});

const ProductCategoryModel = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategoryModel;
