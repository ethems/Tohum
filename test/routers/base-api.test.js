const request = require('supertest');
const should = require('should');
const mockery = require('mockery');

describe('BASE API', () => {
  let app;
  before((done) => {
    mockery.enable({warnOnUnregistered: false});
    const authenticationControllerMock = {
      signup: (req, res, next) => res.sendStatus(200),
      signin: (req, res, next) => res.sendStatus(200)
    };
    const dbMock = {};
    mockery.registerMock('./lib/db', dbMock);
    mockery.registerMock('../../controllers/authentication-controller', authenticationControllerMock);
    app = require('../../app');
    done();
  });
  after((done) => {
    mockery.disable();
    app.close();
    done();
  });
  describe('Signup', () => {
    it('Should return 400 when there are no credentials in request', (done) => {
      request(app).post('/api/signup').expect(400).end((err, res) => {
        done();
      });
    });
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
