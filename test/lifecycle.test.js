const sails = require('sails');
const Chance = require('chance');
global.chance = new Chance();
global.chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();
global.request = require('supertest');
global.sinon = require('sinon');

before((done) => {
  sails.lift({}, (err) => {
    if (err) {
      return done(err);
    }
    return done();
  });
});

after((done) => {
  sails.lower(done);
});
