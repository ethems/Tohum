const request = require('supertest');
const mockery = require('mockery');
const should = require('should');

describe('BASE API', () => {
  let app;
  before((done) => {
    mockery.enable({warnOnUnregistered: false});
    mockery.registerMock('../../controllers/authentication-controller', {
      signup: (req, res, next) => {
        return res.sendStatus(200);
      },
      signin: (req, res, next) => {
        return res.sendStatus(200);
      }
    });
    app = require('../../app');
    done();
  });
  after((done) => {
    mockery.disable();
    app.close();
    done();
  });
  describe('Signup', () => {
    it('Should return 200 when POST "/api/signup"', (done) => {
      const u = {
        email: 'aa@aa.com',
        password: '111'
      }
      request(app).post('/api/signup').send(u).expect(200).end((err, res) => {
        should.not.exists(err);
        done();
      });
    });
  });
});
