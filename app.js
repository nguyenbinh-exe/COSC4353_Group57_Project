require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const connection = require('./backend/config/database');
const MongoStore = require('connect-mongo')(session);


const app = express();

mongoose.set('strictQuery',false);
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

/////////////// PASSPORT //////////////////
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions'});
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

require('./backend/config/passport')
app.use(passport.initialize());
app.use(passport.session());

/////////////////////// END /////////////////////


//////////////////// MIDDLEWARE ///////////////////////
const profileRoute = require('./backend/routes/profile');
const fuelquoteRoute = require('./backend/routes/fuelQuote');
const home = require('./backend/routes/index');
const user = require('./backend/routes/user');

app.use('/', profileRoute);
app.use('/', fuelquoteRoute);
app.use('/', home);
app.use('/', user);

/////////////////////// END /////////////////////

app.get('/contactUs',function(req,res){
    res.render('contact')
})

app.listen(3000,function(){
    console.log(`Server is running on port: ${3000}`)
})
