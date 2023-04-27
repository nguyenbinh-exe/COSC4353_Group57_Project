const app = require("../routes/profile");
const mockingoose = require('mockingoose');

let ClientData = require('../models/clientInformation.model');
let FuelQuote = require('../models/fuelQuote.model');
let UserCredentials = require('../models/userCredentials.model');
const { expect } = require('chai');
const sinon = require('sinon');

it('create profile get', () => {
    const resp = { 
        render: (view) => { 
            expect(view).to.be.equal('../views/profile_management/create_profile');
        }
    }
    app.handle({url: '/create_profile', method: 'GET'}, resp);
});

it('create profile post', () => {
  let ID = "643258d491d8d18a99d65a6d";
  let body = {
    "id": "643258d491d8d18a99d65a6d",
    "name": "Sally Vo",
    "address1": "1600",
    "address2": "Pennsylvania",
    "city": "rehab",
    "state": "CA",
    "zipcode": 95131
  };
  sinon.stub(ClientData.prototype, 'save').resolves({user: { userID: ID}})
  mockingoose(UserCredentials).toReturn({}, 'findOne');
  const resp = { 
      render: (view, body) => { 
          expect(body).to.be.equal('Thank you for registering. Please sign in again.');
      }
  }
  app.handle({url: '/create_profile', login: () => {}, logout: () => {}, method: 'POST', user: { _id: ID}, body: body, isAuthenticated: () => true }, resp);
});

it('create profile client data error', () => {
  let ID = "643258d491d8d18a99d65a6d";
  let body = {
    "id": "643258d491d8d18a99d65a6d",
    "name": "Sally Vo",
    "address1": "1600",
    "address2": "Pennsylvania",
    "city": "rehab",
    "state": "CA",
    "zipcode": 95131
  };
  sinon.stub(ClientData.prototype, 'save').rejects("error")
  mockingoose(UserCredentials).toReturn({}, 'findOne');
  const resp = { 
      render: (view, body) => { 
          expect(body).to.be.equal('Thank you for registering. Please sign in again.');
      },
      status: (code) => {
        expect(code).to.be.equal(400);
        return {
          json: (msg) => {}
        }
      }
  }
  app.handle({url: '/create_profile', login: () => {}, logout: () => {}, method: 'POST', user: { _id: ID}, body: body, isAuthenticated: () => true }, resp);
});

it('create profile user cred error', () => {
  let ID = "643258d491d8d18a99d65a6d";
  let body = {
    "id": "643258d491d8d18a99d65a6d",
    "name": "Sally Vo",
    "address1": "1600",
    "address2": "Pennsylvania",
    "city": "rehab",
    "state": "CA",
    "zipcode": 95131
  };
  sinon.stub(ClientData.prototype, 'save').resolves({user: { userID: ID}})
  sinon.stub(UserCredentials, 'findOne').rejects("error");
  const resp = { 
      render: (view, body) => { 
          expect(body).to.be.equal('Thank you for registering. Please sign in again.');
      },
      status: (code) => {
        expect(code).to.be.equal(400);
        return {
          json: (msg) => {}
        }
      }
  }
  app.handle({url: '/create_profile', login: () => {}, logout: () => {}, method: 'POST', user: { _id: ID}, body: body, isAuthenticated: () => true }, resp);
});

it('create profile unauthenticated', () => {
  let ID = "643258d491d8d18a99d65a6d";
  let body = {
    "id": "643258d491d8d18a99d65a6d",
    "name": "Sally Vo",
    "address1": "1600",
    "address2": "Pennsylvania",
    "city": "rehab",
    "state": "CA",
    "zipcode": 95131
  };
  sinon.stub(ClientData.prototype, 'save').resolves({user: { userID: ID}})
  mockingoose(UserCredentials).toReturn({}, 'findOne');
  const resp = { 
      redirect: (view) => { 
          expect(view).to.be.equal('/login');
      }
  }
  app.handle({url: '/create_profile', login: () => {}, logout: () => {}, method: 'POST', user: { _id: ID}, body: body, isAuthenticated: () => false }, resp);
});

it('update profile get', () => {
  mockingoose(ClientData).toReturn({name: "testuser"}, 'findOne');
  const resp = { 
      render: (view, body) => { 
          expect(body.name).to.be.equal("testuser");
      }
  }
  app.handle({url: '/update_profile/:id', method: 'GET', params: {id: '123'}}, resp);
});

it('update profile post', () => {
  mockingoose(ClientData).toReturn({name: "testuser"}, 'findOneAndUpdate');
  const resp = { 
      redirect: (view) => { 
          expect(view).to.satisfy(s => s.startsWith("/view_profile/"));
      }
  }
  app.handle({url: '/update_profile/:id', method: 'POST', body: {}, params: {id: '123'}}, resp);
});

it('view profile', () => {
  mockingoose(ClientData).toReturn({
    "id": "643258d491d8d18a99d65a6d",
    "name": "Sally Vo",
    "address1": "1600",
    "address2": "Pennsylvania",
    "city": "rehab",
    "state": "CA",
    "zipcode": 95131
  }, 'findOne');
  mockingoose(UserCredentials).toReturn({username: "testuser"}, 'findOne');
  const resp = { 
      redirect: (view) => { 
          expect(view).to.satisfy(s => s.startsWith("/view_profile/"));
      },
      render: (view, body) => {
        expect(body.name).to.be.equal("Sally Vo");
      }
  }
  app.handle({url: '/view_profile/:id', method: 'GET', body: {}, params: {id: '123'}, isAuthenticated: () => true}, resp);
});

it('view profile no user found', () => {
  mockingoose(ClientData).toReturn(null, 'findOne');
  const resp = { 
      render: (view, body) => {
        expect(view).to.be.null;
      }
  }
  app.handle({url: '/view_profile/:id', method: 'GET', body: {}, params: {id: '123'}, isAuthenticated: () => true}, resp);
});

it('view profile unauthenticated', () => {
  mockingoose(ClientData).toReturn({
    "id": "643258d491d8d18a99d65a6d",
    "name": "Sally Vo",
    "address1": "1600",
    "address2": "Pennsylvania",
    "city": "rehab",
    "state": "CA",
    "zipcode": 95131
  }, 'findOne');
  mockingoose(UserCredentials).toReturn({username: "testuser"}, 'findOne');
  const resp = { 
      redirect: (view) => { 
          expect(view).to.be.equal('/login');
      }
  }
  app.handle({url: '/view_profile/:id', method: 'GET', body: {}, params: {id: '123'}, isAuthenticated: () => false}, resp);
});


afterEach(() => {
    sinon.restore();
});