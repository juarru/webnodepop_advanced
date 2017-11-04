const request = require('supertest');

// Using mockgoose for testing
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);

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
});