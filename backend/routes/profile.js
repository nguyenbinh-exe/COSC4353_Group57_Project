const express = require("express");

var router = express.Router();
let Client = require('../models/clientInformation.model');

//router.get('/', (req, res) => {
//    Client.find()
//    .then(clientinfo => res.json(clientinfo))
//    .catch(err => res.status(400).json('Error: ' + err));
//});

router.get('/create_profile', (req, res) => {
    res.render('../views/profile_management/create_profile')
});

router.post('/added_profile', (req, res, next) => {
    
    const body = req.body;
    const name = body.fullname;
    const address1 = body.address1;
    const address2 = body.address2;
    const city = body.city;
    const state = body.state;
    const zipcode = body.zipcode;

    const newClient = new Client({
        name, 
        address1,
        address2,
        city,
        state,
        zipcode,

    });

    newClient.save()
    //.then(() => res.json('user added'))
    .then(() => res.render('../views/profile_management/view_profile', {name, address1, address2, city, state, zipcode}))
    .catch(err => res.status(400).json('Error: ' + err));

    
});

router.get('/view_profile', (req, res, next) => {
    const userId = '64292ade5cf824df75ccad21'; 

    Client.findById(userId).exec()
    .then((user) => {
        if (!user) {
        console.log('User not found');
        } else {
            const name = user.name;
            const address1 = user.address1;
            const address2 = user.address2;
            const city = user.city;
            const state = user.state;
            const zipcode = user.zipcode;   
            let display_zipcode = zipcode.toString();
            res.render('../views/profile_management/view_profile', {name, address1, address2, city, state, display_zipcode})
        }
      });
    
    
    
});



//router.get('/update', (req, res, next) => {
//    res.render('profile_management/create_profile')
//});

module.exports = router;