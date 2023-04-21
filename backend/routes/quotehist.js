const express = require("express");

var router = express.Router();

let FuelQuote = require('../models/fuelQuote.model');

router.post('/add_fuel_quote', (req, res) => {
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

router.get('/get_all_fuel_quotes', (req, res) => {
    FuelQuote.find({clientID: req.body.clientID}).then((result, err) => {
        console.log(err)
        if (err) {
          console.log(err);
        } else {
          
          res.render('quotehist'); //  Need to send data to front end
          //res.send(result);
        }
      });
});


module.exports = router;