const should = require('should');
const User = require('../../models/user');
const co = require('co');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

describe('USER  MODEL', () => {
  let db;
  before((done) => {
    db = require('../../lib/db')();
    db.connection.collections.users.remove();
    db.connection.collections.users.insert({email: 'test@test.com', password: '123'});
    db.connection.collections.users.insert({email: 'testbcrypt@test.com', password: '123'});
    done();
  });
  after((done) => {
    db.connection.close();
    done();
  });

  describe('#Save', () => {
    it('Should create a user', (done) => {
      co(function * () {
        const u = {
          email: 'test1@test.com',
          password: '1234'
        };
        const user = yield User.create(u);
        should.exist(user);
        done();
      });
    });

    it('Should throw exception when create a user with existed email', (done) => {
      co(function * () {
        const u = {
          email: 'test@test.com',
          password: '1234'
        };
        try {
          yield User.create(u);
        } catch (err) {
          should.exist(err);
          done();
        }
      });
    });

    it('Should call bcrypt functions when create a user', (done) => {
      const genSaltSpy = sinon.spy(bcrypt, 'genSalt');
      co(function * () {
        const u = {
          email: 'test2@test.com',
          password: '1234'
        };
        const user = yield User.create(u);
        genSaltSpy.called.should.be.true();
        genSaltSpy.restore();
        done();
      });
    });

    it('Should NOT call bcrypt functions when update a user', (done) => {
      const genSaltSpy = sinon.spy(bcrypt, 'genSalt');
      co(function * () {
        const user = yield User.findOne({email: 'testbcrypt@test.com'}).exec();
        yield user.save({email: 'test3@test.com'});
        genSaltSpy.called.should.be.false();
        genSaltSpy.restore();
        done();
      });
    });
  });
  describe('#Compare', () => {
    it('Should call bcrypt compare when call "comparePassword" function', (done) => {
      const compareSpy = sinon.spy(bcrypt, 'compare');
      co(function * () {
        const user = yield User.findOne({email: 'test@test.com'}).exec();
        should.exist(user);
        user.comparePassword('xxx', () => {});
        compareSpy.called.should.be.true();
        compareSpy.restore();
        done();
      });
    });
  });
});
