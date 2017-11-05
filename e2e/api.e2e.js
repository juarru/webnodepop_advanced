const request = require('supertest');

// Using mockgoose for testing
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);

const uri = '/api/v1/commercials'

describe('API Tests', function () {

    before(async function () {
        await mockgoose.prepareStorage();
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb://example.com/TestingDB', {
            useMongoClient: true
        });

        // Cleaning models and schemas from mongoose
        mongoose.models = {};
        mongoose.modelSchemas = {};

        app = require('../app');
    });

   it('should return 200', function (done) {
       request(app)
           .get('/')
           .expect(200, done);
   })

    it('should return JSON of commercials', function (done) {
        request(app)
            .get(uri)
            .send({ email: 'user@example.com', key: '1234'})
            .expect(200, done);
    })

    it('should return JSON of commercials filter by tag', function(done) {
        const url = uri + '?tag=mobile';
        request(app)
            .get(url)
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it('should fail when filtering by a unknown parameter', function(done) {
        const url = uri + '?color=red';
        request(app)
            .get(url)
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it('should return JSON of commercials giving a name', function(done) {
        const url = uri + '?name=phone';
        request(app)
            .get(url)
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it('should return JSON of commercials filter by sale flag', function(done) {
        const url = uri + '?sale=true';
        request(app)
            .get(url)
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it('should return JSON of commercials filter by price', function(done) {
        const url = uri + '?price=100';
        request(app)
            .get(url)
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it('should return TOKEN when correct email - key', function(done) {
        const url = '/authenticate';
        request(app)
            .post(url)
            .send({ email: 'user@example.com', key: '1234'})
            .expect(200, done)
    });
});