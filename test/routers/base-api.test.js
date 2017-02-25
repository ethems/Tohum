const request = require('supertest');
const mockery = require('mockery');
const should = require('should');
const mockgoose = require('mockgoose');
const mongoose = require('mongoose');
const User = require('../../models/user');

describe('BASE API', () => {
  let app;
  before((done) => {
    mockgoose(mongoose);
    User.create({email: 'base@api.com', password: 'xxxxx'});
    app = require('../../app');
    done();
  });
  after((done) => {
    mockgoose.reset(function() {
      app.close();
      done()
    });
  });
  describe('Signup', () => {
    it('Should return 200 when POST "/api/signup"', (done) => {
      const u = {
        email: 'base1@api.com',
        password: '111'
      }
      request(app).post('/api/signup').send(u).expect(200).end((err, res) => {
        should.not.exists(err);
        done();
      });
    });
  });
});
