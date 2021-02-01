const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const { testJSON } = require('../utils/messages');

describe('Messages: history message', () => {
  it('should return an array containing json strings', (done) => {
    request(app)
      .get('/messages')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(Array.isArray(res.body)).to.true;
        expect(testJSON(res.body[0])).to.true;
        done();
      });
  });

  it('should have properties of user, msg and time', (done) => {
    request(app)
      .get('/messages')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(JSON.parse(res.body[0])).to.have.property('user');
        expect(JSON.parse(res.body[0])).to.have.property('msg');
        expect(JSON.parse(res.body[0])).to.have.property('time');
        done();
      });
  });
});
