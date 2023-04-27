const request = require('supertest');
const app = require("../routes/userActions");
const sinon = require('sinon')
const mockingoose = require('mockingoose');

let ClientData = require('../models/clientInformation.model');
let FuelQuote = require('../models/fuelQuote.model');
sinon.stub(FuelQuote.prototype, 'save').resolves({status: 200})
sinon.stub(ClientData.prototype, 'save').resolves({status: 200})
mockingoose(ClientData).toReturn(
    {
        "id": "643258d491d8d18a99d65a6d",
        "name": "Sally Vo",
        "address1": "1600",
        "address2": "Pennsylvania",
        "city": "rehab",
        "state": "CA",
        "zipcode": 95131
    }, 'findOne');


it('tests /added_profile ', async () => {
    await request(app).post('/added_profile', 
    {
        "firstname": "Minh",
        "lastname": "Vo",
        "address1": "1600",
        "address2": "Pennsylvania",
        "city": "rehab",
        "state": "CA",
        "zipcode": 95131
    }).then( ( (res) =>  { 
        console.log(res)
        expect(res.status).toEqual(200); 
    
    }))
});

it('tests /add_fuel_quote', async () => {
    await request(app).post('/add_fuel_quote', 
    {     
        clientID : "643258d491d8d18a99d65a6d",
        gallonsRequested: 3,
        suggestedPrice: 4
    }).then( ( (res) =>  { expect(res.status).toEqual(200); }))
});

it('retrieves all quote data from customer', async () => {
    mockingoose(FuelQuote).toReturn([{
        clientID: '5dbff32e367a343830cd2f49',
        suggestedPrice: 1,
        gallonsRequested: 0
    },
    {
        clientID: '5dbff89209dee20b18091ec3',
        suggestedPrice: 2,
        gallonsRequested: 0
    }
    ], 'find');

    await request(app).get('/get_all_fuel_quotes', 
    {     
        clientID : "643258d491d8d18a99d65a6d",
    }).then( ( (res) =>  {
        expect(res.status).toEqual(200); 
        expect(res.body.length).toEqual(2);
    }));
})

it('retrieves customer data', async () => {

    await request(app).get('/view_profile', 
    {     
        id : "643258d491d8d18a99d65a6d",
    }).then( ( (res) =>  {
        console.log(res)
        expect(res.status).toEqual(200); 
    }));
})

it('retrieves customer data', async () => {

    await request(app).post('/update_profile', 
    {
        id : "643258d491d8d18a99d65a6d",
        name: "Test Vo",
        address1: "1600",
        address2: "Pennsylvania",
        city: "rehab",
        state: "CA",
        zipcode: 95131
    }).then( ((res) =>  {
        console.log(res.error)
        expect(res.status).toEqual(200); 
        
    }));
})

it('no customer data', async () => {
    mockingoose(ClientData).toReturn(
        null, 'findOne');

    await request(app).post('/update_profile', 
    {
        id : "643258d491d8d18a99d65a6d",
        name: "Test Vo",
        address1: "1600",
        address2: "Pennsylvania",
        city: "rehab",
        state: "CA",
        zipcode: 95131
    }).then( ((res) =>  {
        console.log(res.error)
        expect(res.status).toEqual(400); 
        
    }));
})

it('view_profile customer data', async () => {
    mockingoose(ClientData).toReturn(
        null, 'findOne');

    await request(app).get('/view_profile', 
    {
        id : "643258d491d8d18a99d65a6d",
        name: "Test Vo",
        address1: "1600",
        address2: "Pennsylvania",
        city: "rehab",
        state: "CA",
        zipcode: 95131
    }).then( ((res) =>  {
        console.log(res.error)
        expect(res.status).toEqual(400); 
        
    }));
})

it('get_all_fuel_quotes no customer data', async () => {
    mockingoose(FuelQuote).toReturn(
        null, 'find');

    await request(app).get('/get_all_fuel_quotes', 
    {
        clientID: "2342"
    }).then( ((res) =>  {
        console.log(res.error)
        expect(res.status).toEqual(400); 
        
    }));
})