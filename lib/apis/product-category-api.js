const productCategoryController = require('../../controllers/product-category-controller');
const validation = require('../../middlewares/validations/product-category-validation');
const jwtAuthentication = require('../../middlewares/jwt-authentication');
const adminAuthentication = require('../../middlewares/admin-authentication');



const productCategoryApi = (apiRouter) => {
  apiRouter.get('/productcategories/:id', validation.getProductCategory, productCategoryController.getProductCategory);
  apiRouter.get('/productcategories/:id/products', validation.getProductsByProductCategory, productCategoryController.getProductsByProductCategory);
  apiRouter.post('/productcategories', jwtAuthentication, adminAuthentication, validation.postProductCategory, productCategoryController.postProductCategory);
  apiRouter.put('/productcategories/:id', jwtAuthentication, adminAuthentication, validation.putProductCategory, productCategoryController.putProductCategory);
  apiRouter.delete('/productcategories/:id', jwtAuthentication, adminAuthentication, validation.deleteProductCategory, productCategoryController.deleteProductCategory);
};

module.exports = {
  default: productCategoryApi
};
