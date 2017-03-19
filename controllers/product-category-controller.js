const _ = require('lodash');
const ProductCategory = require('../models/product-category');
const productCategoryService = require('../services/product-category-service');

const getProductCategory = async(req, res, next) => {
  const {
    id
  } = req.params;
  try {
      // Find ProductCategory
    const foundProductCategory = await ProductCategory.findByIdAndPopulate(id).exec();
    // Check found product Category
    if (foundProductCategory) {
      return res.json(foundProductCategory);
    }
    const error = new Error(`There is no product-category with ${id}`);
    error.statusCode = 400;
    throw error;
  } catch (err) {
    return next(err);
  }
};



const postProductCategory = async(req, res, next) => {
    // newParentId is for new parentId
  const {
    name,
    newParentId
  } = req.body;
  // create with just name property
  const creatingProductCategory = _.pick(req.body, ['name']);
  try {
      // create ProductCategory
    const createdCategory = await ProductCategory.create(creatingProductCategory);
    if (newParentId) {
        // Update parent ,and ancestors
      await productCategoryService.addCategory(createdCategory._id, newParentId);
    }
    const foundProductCategory = await ProductCategory.findByIdAndPopulate(createdCategory._id).exec();
    return res.json(foundProductCategory);
  } catch (err) {
    return next(err);
  }
};

const putProductCategory = async(req, res, next) => {
  const {
    id
  } = req.params;
  const {
    newParentId
  } = req.body;
  // update just name property
  const updatingProductCategory = _.pick(req.body, ['name']);
  const updateOptions = {
    new: true,
    upsert: false
  };
  try {
      // update ProductCategory
    const updatedProduct = await ProductCategory.findOneAndUpdate({
      _id: id
    }, updatingProductCategory, updateOptions);
    if (newParentId) {
        // if there is newParentId,  update parent and ancestors 
      if (updatedProduct.parent) {
          // if existed parent , update parent and ancestors
        await productCategoryService.updateCategory(id, newParentId);
      } else {
          // if there is no existed parent , add parent and ancestors
        await productCategoryService.addCategory(id, newParentId);
      }
    } else if (newParentId === null) {
        // if intentianly newParentId is null , remove ancestors and parent
      await productCategoryService.removeParentCategory(id);
    }
    const foundProductCategory = await ProductCategory.findByIdAndPopulate(id).exec();
    return res.json(foundProductCategory);
  } catch (err) {
    return next(err);
  }
};



module.exports = {
  getProductCategory,
  postProductCategory,
  putProductCategory
};
