const express = require("express");

var router = express.Router();

router.get('/create_profile', (req, res, next) => {
    res.render('profile_management/create_profile')
    //res.send({data: 'data'});
 });

router.get('/view_profile', (req, res, next) => {
    var name = 'Banana Republic';
    var address = '12345 Abcd Road';
    var city = 'Houston';
    var state = 'TX';
    var zipcode = '98765';
    res.render('profile_management/view_profile', {name, address, city, state, zipcode})
});

//router.get('/update', (req, res, next) => {
//    res.render('profile_management/create_profile')
//});

module.exports = router;