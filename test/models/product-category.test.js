const should = require('should');
const ProductCategory = require('../../models/product-category');
const co = require('co');
const mongoose = require('mongoose');
const config = require('../../config');
const bluebird = require('bluebird');

describe('PRODUCT CATEGORY MODEL', () => {
  before((done) => {
    mongoose.Promise = bluebird;
    mongoose.connect(config.get('connectionString'));
    mongoose.connection.collections.productcategories.remove();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  describe('#Save', () => {
    it('Should create a product category', (done) => {
      co(function * () {
        const pC = {
          name: 'productCategory1'
        };
        const productCategory = yield ProductCategory.create(pC);
        should.exist(productCategory);
        done();
      });
    });
  });
});
