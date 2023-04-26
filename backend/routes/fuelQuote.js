const express = require("express");

var router = express.Router();

let FuelQuote = require('../models/fuelQuote.model');
const ClientData = require('../models/clientInformation.model');


/////////////// GET QUOTE //////////////////
router.get('/formquote', async function(req, res) {
    try {
        const clientID = req.user._id;
        const fuelQuote = await FuelQuote.findOne({ clientID: clientID }).exec();
        const hasHistory = !!fuelQuote;
        const client = await ClientData.findOne({  userID: req.user._id}).exec();

        res.render('form_quote', {  name: client.name,
                                                userid: client._id,
                                                address1: client.address1,
                                                address2: client.address2,
                                                city: client.city,
                                                state: client.state,
                                                zipcode: client.zipcode,
                                                hasHistory });
    } catch (err) {
        console.log(err);
    }
});

router.post('/add_fuel_quote', (req, res) => {
    if(req.isAuthenticated()) {
        const clientID = req.user._id
        var body = req.body
        var gallonsRequested = body.gallonsRequested
        var deliveryDate = body.deliveryDate
        var suggestedPrice = body.suggestedPrice
        var totalPrice = body.totalPrice
        const fuelQuote = new FuelQuote({
            clientID,
            gallonsRequested,
            deliveryDate,
            suggestedPrice,
            totalPrice
        });
        fuelQuote.save();
    }


});

/////////////// END //////////////////

/////////////// VIEW QUOTE //////////////////

router.get('/quotes', (req, res) => {
  if(req.isAuthenticated()) {
    const clientID = req.user._id;
    ClientData.findOne({userID: clientID})
      .then((client) => {
        const address1 = client.address1;
        const address2 = client.address2;
        const city = client.city;
        const state = client.state;
        const zipcode = client.zipcode;
        var display_zipcode = zipcode.toString()
        const client_address = address1 + ' ' + address2 + ' ' + city + ' ' + state + ' ' + display_zipcode
        FuelQuote.find({clientID: clientID})
          .then((result, err) => {
            if (err) {
              console.log
            } else {
              console.log(result)
              res.render('REALquotehist', {name: client.name, userid: client._id, client_address, quotes: result});
            } 
          })    
    });
  } else {
    res.redirect('/login');
  }
});
/////////////// END //////////////////

module.exports = router;