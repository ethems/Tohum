const should = require('should');
const User = require('../../models/user');
const ProductCategory = require('../../models/product-category');
const Product = require('../../models/product');
const co = require('co');
const mongoose = require('mongoose');
const config = require('../../config');
const bluebird = require('bluebird');
const httpMocks = require('node-mocks-http');
const ProductController = require('../../controllers/product-controller');



describe('PRODUCT CONTROLLER', () => {
  let user;
  let productCategory;
  let product;
  before((done) => {
    mongoose.Promise = bluebird;
    mongoose.connect(config.get('connectionString'));
    co(function*() {
      yield Product.remove({});
      yield User.remove({});
      yield ProductCategory.remove();
      productCategory = yield ProductCategory.create({
        name: 'testproductcategory'
      });
      user = yield User.create({
        email: 'testuser@test.com',
        password: '123'
      });
      product = yield Product.create({
        name: 'product controller product',
        owner: user._id,
        category: productCategory._id,
        address: {
          streetLine1: 'xx',
          city: 'xx'
        }
      });
      done();
    });
  });
  after((done) => {
    mongoose.connection.close();
    done();
  });
  describe('GetProduct', () => {
    it('Should return Product', (done) => {
      let request = httpMocks.createRequest({
        method: 'GET',
        params: {
          id: 1
        }
      });
      let response = httpMocks.createResponse();
      ProductController.getProduct(request, response, () => {});
      done();
    });
  });
});