const should = require('should');
const co = require('co');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const ProductCategoryService = require('../../services/product-category-service');
const ProductCategory = require('../../models/product-category');
const config = require('../../config');

describe('PRODUCT CATEGORY SERVICE', () => {
  before((done) => {
    mongoose.Promise = bluebird;
    mongoose.connect(config.get('connectionString'));
    mongoose.connection.collections.productcategories.remove();
    mongoose.connection.collections.productcategories.insert({name: 'test'});
    mongoose.connection.collections.productcategories.insert({name: 'testparent'});

    mongoose.connection.collections.productcategories.insert({name: 'test1'});
    mongoose.connection.collections.productcategories.insert({name: 'testparent1'});
    mongoose.connection.collections.productcategories.insert({name: 'testancestor1'});

    mongoose.connection.collections.productcategories.insert({name: 'test2'});
    mongoose.connection.collections.productcategories.insert({name: 'testparent2'});
    mongoose.connection.collections.productcategories.insert({name: 'testancestor2'});
    mongoose.connection.collections.productcategories.insert({name: 'testancestor22'});

    done();
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  describe('#ADDCATEGORY', () => {
    it('Should throw  exception when ADDCATEGORY called with empty parameters', (done) => {
      co(function * () {
        try {
          const p = yield ProductCategory.findOne({name: 'test'}).exec();
          yield ProductCategoryService.addCategory(p._id);
        } catch (err) {
          should.exists(err);
          done();
        }
      });
    });
    it('Should throw  exception when ADDCATEGORY called with non existed categories', (done) => {
      co(function * () {
        try {
          yield ProductCategoryService.addCategory(mongoose.Types.ObjectId(), mongoose.Types.ObjectId());
        } catch (err) {
          should.exists(err);
          done();
        }
      });
    });
    it('Should ADDCATEGORY work properly with existed categorites', (done) => {
      co(function * () {
        const p = yield ProductCategory.findOne({name: 'test'}).exec();
        const pp = yield ProductCategory.findOne({name: 'testparent'}).exec();
        yield ProductCategoryService.addCategory(p._id, pp._id);
        const pUpdated = yield ProductCategory.findOne({name: 'test'}).exec();
        const ppUpdated = yield ProductCategory.findOne({name: 'testparent'}).exec();
        pUpdated.ancestors.length.should.equal(1);
        pUpdated.ancestors[0].equals(pp._id).should.equal(true);
        ppUpdated.ancestors.length.should.equal(0);
        done();
      });
    });
    it('Should ADDCATEGORY work properly with existed categorites v2', (done) => {
      co(function * () {
        const p = yield ProductCategory.findOne({name: 'test1'}).exec();
        const pp = yield ProductCategory.findOne({name: 'testparent1'}).exec();
        const pa = yield ProductCategory.findOne({name: 'testancestor1'}).exec();

        yield ProductCategoryService.addCategory(pp._id, pa._id);
        yield ProductCategoryService.addCategory(p._id, pp._id);
        const pUpdated = yield ProductCategory.findOne({name: 'test1'}).exec();
        const ppUpdated = yield ProductCategory.findOne({name: 'testparent1'}).exec();
        pUpdated.ancestors.length.should.equal(2);
        pUpdated.parent.equals(pp._id).should.equal(true);
        ppUpdated.ancestors.length.should.equal(1);
        ppUpdated.parent.equals(pa._id).should.equal(true);
        done();
      });
    });
  });
  describe('#UPDATECATEGORY', () => {
    co(function * () {
      it('Should throw  exception when UPDATECATEGORY called with empty parameters', (done) => {
        co(function * () {
          try {
            const p = yield ProductCategory.findOne({name: 'test2'}).exec();
            yield ProductCategoryService.updateCategory(p._id);
          } catch (err) {
            should.exists(err);
            done();
          }
        });
      });
    });
    it('Should throw  exception when UPDATECATEGORY called with non existed categories', (done) => {
      co(function * () {
        try {
          yield ProductCategoryService.updateCategory(mongoose.Types.ObjectId(), mongoose.Types.ObjectId());
        } catch (err) {
          should.exists(err);
          done();
        }
      });
    });
    it('Should UPDATECATEGORY work properly', (done) => {
      co(function * () {
        const p = yield ProductCategory.findOne({name: 'test2'}).exec();
        const pp = yield ProductCategory.findOne({name: 'testparent2'}).exec();
        const pa = yield ProductCategory.findOne({name: 'testancestor2'}).exec();
        const pa2 = yield ProductCategory.findOne({name: 'testancestor22'}).exec();
        yield ProductCategoryService.addCategory(pp._id, pa._id);
        yield ProductCategoryService.addCategory(p._id, pp._id);
        yield ProductCategoryService.updateCategory(pp._id,pa2._id);
        const pUpdated = yield ProductCategory.findOne({name: 'test2'}).exec();
        const ppUpdated = yield ProductCategory.findOne({name: 'testparent2'}).exec();
        ppUpdated.ancestors.length.should.equal(1);
        pUpdated.ancestors.length.should.equal(2);
        ppUpdated.parent.equals(pa2._id).should.equal(true);
        done();
      });
    });
  });
});
