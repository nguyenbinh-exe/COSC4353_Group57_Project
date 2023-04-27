const app = require("../routes/fuelQuote");
const mockingoose = require('mockingoose');

let ClientData = require('../models/clientInformation.model');
let FuelQuote = require('../models/fuelQuote.model');
const { expect } = require('chai');
const sinon = require('sinon');

it('form quote success', () => {
    let ID = "643258d491d8d18a99d65a6d";
    const resp = { 
        render: (view, body) => { 
            expect(body.hasHistory).to.be.true;
        }
    }
    mockingoose(FuelQuote).toReturn(
        {
            clientID: ID
        }, 'findOne');
    mockingoose(ClientData).toReturn(
        {
            _id : "643258d491d8d18a99d65a6d",
            name: "Test Vo",
            address1: "1600",
            address2: "Pennsylvania",
            city: "rehab",
            state: "CA",
            zipcode: 95131
        }, 'findOne');
    app.handle({url: '/formquote', method: 'GET', user: { id: ID} }, resp);
});

it('form quote error', () => {
    let ID = "643258d491d8d18a99d65a6d";
    const resp = { 
        render: (view, body) => { 
            throw new Error("some error");
        }
    }
    mockingoose(FuelQuote).toReturn(
        {
            clientID: ID
        }, 'findOne');
    mockingoose(ClientData).toReturn(
        {
            _id : "643258d491d8d18a99d65a6d",
            name: "Test Vo",
            address1: "1600",
            address2: "Pennsylvania",
            city: "rehab",
            state: "CA",
            zipcode: 95131
        }, 'findOne');
    app.handle({url: '/formquote', method: 'GET', user: { id: ID} }, resp);
});

it('add fuel quote', () => {
    let ID = "643258d491d8d18a99d65a6d";
    const resp = { 
        redirect: (view) => { 
            expect(view).to.be.equal("quotes");
        }
    }
    sinon.stub(FuelQuote.prototype, 'save').resolves({status: 200})
    app.handle({url: '/add_fuel_quote', method: 'POST', user: { _id: ID}, body: {gallonsRequested: 1, deliveryDate: '2023-03-03', suggestedPrice: 100, totalPrice: 100}, isAuthenticated: () => true }, resp);
});

it('add fuel quote unauthenticated', () => {
    let ID = "643258d491d8d18a99d65a6d";
    const resp = { 
        redirect: (view) => { 
            expect(view).to.be.equal("quotes");
        }
    }
    sinon.stub(FuelQuote.prototype, 'save').rejects("error")
    app.handle({url: '/add_fuel_quote', method: 'POST', user: { _id: ID}, body: {gallonsRequested: 1, deliveryDate: '2023-03-03', suggestedPrice: 100, totalPrice: 100}, isAuthenticated: () => false }, resp);
});

it('get quotes authenticated success', () => {
    let name = "test";
    let ID = "643258d491d8d18a99d65a6d";
    const resp = { 
        render: (view, body) => { 
            expect(body.name).to.be.equal(name);
        }
    }
    mockingoose(ClientData).toReturn(
        {
            _id : ID,
            name: name,
            address1: "1600",
            address2: "Pennsylvania",
            city: "rehab",
            state: "CA",
            zipcode: 95131
        }, 'findOne');
    mockingoose(FuelQuote).toReturn(
        {
            clientID: ID
        }, 'find');
    app.handle({url: '/quotes', method: 'GET', user: { id: ID}, isAuthenticated: () => true }, resp);
});

it('get quotes authenticated error', () => {
    let name = "test";
    let ID = "643258d491d8d18a99d65a6d";
    const resp = { 
        sendStatus: (code) => { 
            expect(code).to.be.equal(500);
        }
    }
    mockingoose(ClientData).toReturn(
        {
            _id : ID,
            name: name,
            address1: "1600",
            address2: "Pennsylvania",
            city: "rehab",
            state: "CA",
            zipcode: 95131
        }, 'findOne');
    sinon.stub(FuelQuote, 'find').rejects("error");
    app.handle({url: '/quotes', method: 'GET', user: { id: ID}, isAuthenticated: () => true }, resp);
});

it('get quotes not authenticated', () => {
    let name = "test";
    const resp = { 
        redirect: (view) => { 
            expect(view).to.be.equal('/login');
        }
    }
    app.handle({url: '/quotes', method: 'GET', isAuthenticated: () => false }, resp);
});


afterEach(() => {
    sinon.restore();
});