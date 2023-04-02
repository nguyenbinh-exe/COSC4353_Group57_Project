const express = require("express");

var router = express.Router();
let Client = require('../models/clientInformation.model');

router.get('/create_profile', (req, res) => {
    const firstname = 'Jon';
    const lastname = 'S';
    res.render('../views/profile_management/create_profile', {firstname, lastname})
});

router.post('/create_profile', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.render('../views/profile_management/create_profile', {firstname, lastname})
});

router.post('/added_profile', (req, res, next) => {
    
    const body = req.body;
    const firstname = body.firstname;
    const lastname = body.lastname;
    const address1 = body.address1;
    const address2 = body.address2;
    const city = body.city;
    const state = body.state;
    const zipcode = body.zipcode;
    let display_zipcode = zipcode.toString();
    const newClient = new Client({
        firstname, 
        lastname,
        address1,
        address2,
        city,
        state,
        zipcode,

    });

    newClient.save()
    //.then(() => res.json('user added'))
    .then(() => res.render('../views/profile_management/view_profile', {firstname, lastname, address1, address2, city, state, display_zipcode}))
    .catch(err => res.status(400).json('Error: ' + err));

    
});

router.get('/view_profile', (req, res, next) => {
    const userId = '6429e7042573257de87191f6'; 

    Client.findById(userId).exec()
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
        }
      });    
});



//router.get('/update', (req, res, next) => {
//    res.render('profile_management/create_profile')
//});

module.exports = router;