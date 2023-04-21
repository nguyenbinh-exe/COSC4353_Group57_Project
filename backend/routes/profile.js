const express = require("express");
//const bodyParser = require("body-parser");

var router = express.Router();

let ClientData = require('../models/clientInformation.model');
//let FuelQuote = require('../models/fuelQuote.model');

//const app = express();
//const port = process.env.PORT || 3003
//app.listen(port)
////app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json())
//const mongoose = require('mongoose');

//mongoose.set('strictQuery',false);

//connect database;
//mongoose.connect('mongodb+srv://admin:Group57@cluster0.peg8eaz.mongodb.net/userDB');
//const connection = mongoose.connection;

//app.set("view engine",'ejs');
/////app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static('public'));

router.post('/create_profile', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.render('../views/profile_management/create_profile', {firstname, lastname})
});

router.post('/added_profile', (req, res) => {
    const body = req.body;
    const firstname = body.firstname;
    const lastname = body.lastname;
    const name = firstname + " " + lastname
    const address1 = body.address1;
    const address2 = body.address2;
    const city = body.city;
    const state = body.state;
    const zipcode = body.zipcode;
    let display_zipcode = zipcode.toString();
    const newClient = new ClientData({
        name,
        address1,
        address2,
        city,
        state,
        zipcode
    });
    
    newClient.save()
     //.then(() => res.json('user added'))
     .then(() => res.render('../views/profile_management/view_profile', {name, address1, address2, city, state, display_zipcode}))
     .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/update_profile', (req, res) => {
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

router.get('/view_profile', (req, res) => {
    const userId = req.body.id; 
    ClientData.findOne({_id: userId})
    .then((user) => {
        if (!user) {
        console.log('User not found');
        } else {
            const firstname = user.firstname;
            const lastname = user.lastname;
            const address1 = user.address1;
            const address2 = user.address2;
            const city = user.city;
            const state = user.state;
            const zipcode = user.zipcode;   
            let display_zipcode = zipcode.toString();
            res.render('../views/profile_management/view_profile', {firstname, lastname, address1, address2, city, state, display_zipcode})
            return
        }
      });    
});



module.exports = router;