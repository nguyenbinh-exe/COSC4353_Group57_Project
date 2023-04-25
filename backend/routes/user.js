const express = require("express");
const passport = require('passport')

var router = express.Router();
const ClientData = require('../models/clientInformation.model');
const userCredentials = require('../models/userCredentials.model');


/////////////// USER REGISTRATION //////////////////
router.get('/register',function (req,res){
    res.render('register');
});

router.post('/register', function(req,res) {

    const newUser = new userCredentials({        
        username: req.body.username,
        password: req.body.password
    });

    newUser.save()
        .then((user) => {
            req.login(user, function (err) {
                if ( !err ) {
                    res.redirect('/create_profile')}
            });
        });
});

/////////////// END //////////////////

/////////////// USER LOGIN //////////////////

router.get('/login',function (req,res){
    res.render('login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/loggedin'}));

router.get('/loggedin',function(req,res){
    if(!req.isAuthenticated()){
        res.redirect('/')
    }
    else{
        ClientData.findOne({userID: req.user._id})
        .then((client) => {
        res.render('homepageAuthenticated',{name: client.name, userid: client._id})
        })
    }

})

/////////////// END //////////////////

/////////////// USER LOGOUT //////////////////

router.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
});

/////////////// END //////////////////

module.exports = router;

