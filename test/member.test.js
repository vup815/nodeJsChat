const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('Members: Register, modify and remove account', () => {
  it('should failed to create an account by an existing account', (done) => {
    request(app)
      .post('/members/register')
      .field('account', 'sam')
      .field('password', '123')
      .end((err, res) => {
        if (err) done(err);
        expect(res.text === 'This account already exist').to.true;
        expect(res.status === 400).to.true;
        done();
      });
  });

  it('should redirect to index page if register success', (done) => {
    request(app)
      .post('/members/register')
      .field('account', 'test')
      .field('password', 'test')
      .end((err, res) => {
        if (err) done(err);
        expect(res.header.location === '/index.html').to.true;
        expect(res.status === 302).to.true;
        done();
      });
  });

  it('should change the password and return modified data', (done) => {
    request(app)
      .put('/members/test')
      .send({ password: 'tttt' })
      .end((err, res) => {
        if (err) done(err);
        expect(JSON.parse(res.text)).property('password').equal('tttt');
        expect(res.status === 200).to.true;
        done();
      });
  });

  it('should delete an account by account', (done) => {
    request(app)
      .delete('/members/test')
      .end((err, res) => {
        if (err) done(err);
        expect(JSON.parse(res.text)).to.have.property('_id');
        expect(JSON.parse(res.text)).to.have.property('account');
        expect(JSON.parse(res.text)).to.have.property('password');
        expect(JSON.parse(res.text)).property('account').equal('test');
        expect(res.status === 200).to.true;
        done();
      });
  });
});

describe('Members: Login and log out', () => {
  it('should be denied by login to a false account', (done) => {
    request(app)
      .post('/members/login')
      .field('account', 'asweresx')
      .field('password', 'dfasdf')
      .end((err, res) => {
        if (err) done(err);
        expect(res.text === 'This account does not exist').to.true;
        expect(res.status === 401).to.true;
        done();
      });
  });

  it('should be denied by login with incorrect password', (done) => {
    request(app)
      .post('/members/login')
      .field('account', 'sam')
      .field('password', 'asdfasd')
      .end((err, res) => {
        if (err) done(err);
        expect(res.text === 'Wrong password').to.true;
        expect(res.status === 401).to.true;
        done();
      });
  });

  it('should redirect to chat page if login success', (done) => {
    request(app)
      .post('/members/login')
      .field('account', 'sam')
      .field('password', '123')
      .end((err, res) => {
        if (err) done(err);
        expect(res.header.location === '/chat.html').to.true;
        expect(res.status === 302).to.true;
        done();
      });
  });

  it('should redirect to index page after logging out', (done) => {
    request(app)
      .get('/members/logout')
      .end((err, res) => {
        if (err) done(err);
        expect(res.header.location === '/index.html').to.true;
        expect(res.status === 302).to.true;
        done();
      });
  });
});
