const should = require('should');
const Product = require('../../models/product');
const ProductCategory = require('../../models/product-category');
const User = require('../../models/user');
const co = require('co');
const sinon = require('sinon');
const mongoose = require('mongoose');
const config = require('../../config');
const bluebird = require('bluebird');

describe('PRODUCT  MODEL', () => {
  before((done) => {
    mongoose.Promise = bluebird;
    mongoose.connect(config.get('connectionString'));
    co(function*() {
      yield Product.remove({});
      yield User.remove({});
      yield ProductCategory.remove();
      yield ProductCategory.collection.insert({
        name: 'testproductcategory'
      });
      yield User.collection.insert({
        email: 'testuserproduct@test.com',
        password: '123'
      });
      done();
    })
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  describe('#Save', () => {
    it('Should create a product', (done) => {
      co(function*() {
        const productCategory = yield ProductCategory.findOne({
          name: 'testproductcategory'
        }).exec();
        const user = yield User.findOne({
          email: 'testuserproduct@test.com'
        }).exec();
        const p = {
          name: 'product1',
          owner: user._id,
          category: productCategory._id,
          address: {
            streetLine1: 'xxxx',
            city: 'xxxx'
          }
        };
        const product = yield Product.create(p);
        should.exist(product);
        done();
      });
    });
  });
});