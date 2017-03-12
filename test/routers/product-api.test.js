const request = require('supertest');
const should = require('should');
const mockery = require('mockery');
const mongoose = require('mongoose');


describe('PRODUCT API', () => {
  let app;
  before((done) => {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true
    });
    const productControllerMock = {
      getProduct: (req, res, next) => {
        return res.sendStatus(200);
      },
      postProduct: (req, res, next) => {
        return res.sendStatus(201);
      },
      putProduct: (req, res, next) => {
        return res.sendStatus(201);
      }
    };
    const jwtMock=(req,res,next)=>next();
    const dbMock = {};
    mockery.registerMock('./lib/db', dbMock);
    mockery.registerMock('../../controllers/product-controller', productControllerMock);
    mockery.registerMock('../../middlewares/jwt-authentication', jwtMock);
    app = require('../../app');
    done();
  });
  after((done) => {
    mockery.disable();
    app.close();
    done();
  });
  describe('Product Get', () => {
    it('Should return 200 when get products/:id', (done) => {
      request(app).get(`/api/products/${mongoose.Types.ObjectId()}`).set('Accept', 'application/json').expect(200).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
  });
  describe('Product Post', () => {
    it('Should return 400 when create products with empty request', (done) => {
      request(app).post('/api/products').send({}).set('Accept', 'application/json').expect(400).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
    it('Should return 400 when create products without address', (done) => {
      request(app).post('/api/products').send({
        name: 'test',
        category: mongoose.Types.ObjectId()
      }).set('Accept', 'application/json').expect(400).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
    it('Should return 201 when create products', (done) => {
      request(app).post('/api/products').send({
        name: 'test',
        category: mongoose.Types.ObjectId(),
        address: {
          streetLine1: 'test',
          city: 'test'
        }
      }).set('Accept', 'application/json').expect(201).end((err, res) => {
        if (err) return done(err);
        done();
      });
    });
  });
});