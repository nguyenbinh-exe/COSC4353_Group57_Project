const express = require("express");

var router = express.Router();

let FuelQuote = require('../models/fuelQuote.model');
const ClientData = require('../models/clientInformation.model');


/////////////// GET QUOTE //////////////////
router.get('/formquote',function (req,res){
  if(req.isAuthenticated()) {
      ClientData.findOne({userID: req.user._id})
          .then((client) => {
          res.render('form_quote', {name: client.name, userid: client._id})
      })
  }else{
      res.redirect('/login')
  }
})

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