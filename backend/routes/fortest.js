const express = require("express");
const bodyParser = require("body-parser");

let ClientData = require('../models/clientInformation.model');
let FuelQuote = require('../models/fuelQuote.model');

const app = express();
const port = process.env.PORT || 3003
app.listen(port)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

//connect database;
mongoose.connect('mongodb+srv://admin:Group57@cluster0.peg8eaz.mongodb.net/userDB');
const connection = mongoose.connection;

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.post('/added_profile', (req, res) => {
    const body = req.body;
    const firstname = body.firstname;
    const lastname = body.lastname;
    const name = firstname + " " + lastname
    const address1 = body.address1;
    const address2 = body.address2;
    const city = body.city;
    const state = body.state;
    const zipcode = body.zipcode;
    const newClient = new ClientData({
        name,
        address1,
        address2,
        city,
        state,
        zipcode
    });
    

    newClient.save().then(() => res.sendStatus(200)).catch(err => res.sendStatus(400).json('Error: ' + err));
})

app.post('/update_profile', (req, res) => {
    var body = req.body
    var id = body.id 
    ClientData.findOne({_id: id}).then((person) => {
    if (!person) {
        console.log('User not found');
        res.sendStatus(400);
        return;
    }
    console.log(person)
    person.name = body.name
    person.address1 = body.address1
    person.address2 = body.address2
    person.city = body.city
    person.state = body.state
    person.zipcode = body.zipcode
    person.save().then(() => res.sendStatus(200))
    });
});

app.get('/view_profile', (req, res) => {
    const userId = req.body.id; 
    ClientData.findOne({_id: userId})
    .then((user) => {
        if (!user) {
        console.log('User not found');
        res.sendStatus(400)
        return
        } else {
            res.send(user)
            return
        }
      });    
});

app.post('/add_fuel_quote', (req, res) => {
    var body = req.body
    var clientID = body.clientID
    var gallonsRequested = body.gallonsRequested
    var suggestedPrice = body.suggestedPrice
    const fuelQuote = new FuelQuote({
        clientID,
        gallonsRequested,
        suggestedPrice
    });

    fuelQuote.save().then(() => res.sendStatus(200)).catch(err => res.sendStatus(400).json('Error: ' + err));
    

});

app.get('/get_all_fuel_quotes', (req, res) => {
    FuelQuote.find({clientID: req.body.clientID}).then((result) => {
        console.log(result)
        if (result) {
            res.send(result);
        } else {
          res.sendStatus(400);
        }
      });
});

module.exports = app