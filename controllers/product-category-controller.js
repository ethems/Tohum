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
    newParentId
  } = req.body;
  // create with just name property
  const creatingProductCategory = _.pick(req.body, ['name']);
  try {
    // create ProductCategory
    const createdCategory = await ProductCategory.create(creatingProductCategory);
    if (newParentId) {
      // Update parent ,and ancestors
      const foundParentProductCategory = await ProductCategory.findById(newParentId).exec();
      if (foundParentProductCategory) {
        await productCategoryService.addCategory(createdCategory._id, newParentId);
      }
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
  const requestBody = _.pick(req.body, ['name']);
  try {
    // update ProductCategory
    const updatingProduct = await ProductCategory.findById(id).exec();
    updatingProduct.updateName(requestBody.name);
    const updatedProduct = await updatingProduct.save();
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

const deleteProductCategory = async(req, res, next) => {
  // Delete ProductCategory , only if it doesnt have any children , or  grandchildren
  const {
    id
  } = req.params;
  try {
    const foundProductCategories = await ProductCategory.find({
      ancestors: id
    }).exec();
    if (foundProductCategories && foundProductCategories.length > 0) {
      const error = new Error(`This productCategory ${id} can not be deleted`);
      error.statusCode = 400;
      throw error;
    } else {
      await ProductCategory.find({
        _id: id
      }).remove().exec();
      return res.sendStatus(202);
    }
  } catch (err) {
    return next(err);
  }
};



module.exports = {
  getProductCategory,
  postProductCategory,
  putProductCategory,
  deleteProductCategory
};