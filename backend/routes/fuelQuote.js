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
        const client = await ClientData.findOne({ userID: req.user._id }).exec();

        res.render('form_quote', { name: client.name, userid: client._id, hasHistory });
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

router.get('/get_all_fuel_quotes', (req, res) => {
    FuelQuote.find({clientID: req.body.clientID}).then((result, err) => {
        console.log(err)
        if (err) {
          console.log(err);
        } else {
            ClientData.findOne({userID: req.user._id})
            .then((client) => {
            res.render('quotehist', {name: client.name, userid: client._id}); //  Need to send data to front end
          //res.send(result);
            })
        }
      });
});

/////////////// END //////////////////

module.exports = router;