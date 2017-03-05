const should = require('should');
const Product = require('../../models/product');
const co = require('co');
const sinon = require('sinon');
const mongoose = require('mongoose');
const config = require('../../config');
const bluebird = require('bluebird');

describe('PRODUCT  MODEL', () => {
  before((done) => {
    mongoose.Promise = bluebird;
    mongoose.connect(config.get('connectionString'));
    mongoose.connection.collections.products.remove();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  describe('#Save', () => {
    it('Should create a product', (done) => {
      co(function * () {
        const p = {
          name: 'product1'
        };
        const product = yield Product.create(p);
        should.exist(product);
        done();
      });
    });
  });
});
