const express = require("express");
//const bodyParser = require("body-parser");

var router = express.Router();

let ClientData = require('../models/clientInformation.model');
const userCredentials = require('../models/userCredentials.model');

/////////////// CREATE PROFILE //////////////////

router.get('/create_profile', (req, res) => {    
    res.render('../views/profile_management/create_profile')
});

router.post('/create_profile', (req, res) => {

    if(req.isAuthenticated()){
        const userID = req.user._id;
        const body = req.body;
        const firstname = body.firstname;
        const lastname = body.lastname;
        const name = firstname + " " + lastname
        const address1 = body.address1;
        const address2 = body.address2;
        const city = body.city;
        const state = body.state;
        const zipcode = body.zipcode;
        //let display_zipcode = zipcode.toString();
        
        const newClient = new ClientData({
            userID,
            name,
            address1,
            address2,
            city,
            state,
            zipcode
        });
        
        newClient.save()
            .then((user) => {
                console.log(user);
                userCredentials.findOne({_id: user.userID})
                .then((client) => {
                    req.login(client, function (err) {
                        if ( !err ) {
                            const message = 'Thank you for registering. Please sign in again.';
                            res.render('message', {message});
                            req.logout()
                        };
                    })
                })   
                .catch(err => res.status(400).json('Error: ' + err));               
            })
            .catch(err => res.status(400).json('Error: ' + err));    

    } else {
        res.redirect('/login')
    }
});

/////////////// END //////////////////


/////////////// UPDATE PROFILE //////////////////

router.get('/update_profile/:id', (req, res) => {    
    const userId = req.params.id; 
    ClientData.findOne({_id: userId})
    .then((user) => {
        const name = user.name;
        res.render('../views/profile_management/update_profile', {name, userid: userId})
    })
    
});

router.post('/update_profile/:id', (req, res) => {

    const userId = req.params.id
     
    ClientData.findOneAndUpdate({_id: userId}, {$set: {
        name : req.body.firstname + ' ' + req.body.lastname,
        address1 : req.body.address1,
        address2 : req.body.address2,
        city : req.body.city,
        state : req.body.state,
        zipcode : req.body.zipcode,
        }})
    .then(() => {
        res.redirect(`/view_profile/${userId}`)
    })   
    
    })           


/////////////// END //////////////////

/////////////// VIEW PROFILE //////////////////

router.get('/view_profile/:id', (req, res) => {

    if(req.isAuthenticated()){
        //const userId = req.user._id; 
        ClientData.findOne({_id: req.params.id})
        .then((user) => {
            if (!user) {
            console.log('User not found');
            } else {
                //const firstname = user.firstname;
                //const lastname = user.lastname;
                const name = user.name;
                const address1 = user.address1;
                const address2 = user.address2;
                const city = user.city;
                const state = user.state;
                const zipcode = user.zipcode;   
                let display_zipcode = zipcode.toString();
            
                userCredentials.findOne({_id: user.userID})
                .then((credentials) => {
                const username = credentials.username
                res.render('../views/profile_management/view_profile', {name, username, address1, address2, city, state, display_zipcode, userid: req.params.id})
                return
                })
        
            }
        });  


    } else{
        res.redirect('/login')
    }
});


/////////////// END //////////////////


module.exports = router;