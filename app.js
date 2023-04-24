require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')


const app = express();

mongoose.set('strictQuery',false);
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));





/////////////// PASSPORT //////////////////
app.use(session({
    secret: 'ThisisGroup57',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

/////////////////////// END /////////////////////










//////////////////// MONGODB ///////////////////////
// mongoose.connect('mongodb+srv://admin:Group57@cluster0.peg8eaz.mongodb.net/userDB');
mongoose.connect('mongodb://0.0.0.0:27017/Group57DB')
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database established!");
})
/////////////////////// END /////////////////////













////////////////////    USER SCHEMA        /////////////////
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    zipcode: Number,
    userName: String,
    passWord: String
})
userSchema.plugin(passportLocalMongoose)
const User = new mongoose.model('User',userSchema)

// Passport stuff
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/////////////////////// END /////////////////////




// set routes - Tung
const profileRoute = require('./backend/routes/profile');
const quotehistRoute = require('./backend/routes/quotehist');

// connect routes - Tung
app.use('/', profileRoute);
app.use('/', quotehistRoute);






///////////////        HOME ROUTE        ////////////////////////////
app.get('/',function (req,res){
    if(req.isAuthenticated()){
        res.redirect('/loggedin')
    }else{
        res.render('homepage')
    }
})

app.get('/loggedin',function(req,res){
    if(!req.isAuthenticated()){
        res.redirect('/')
    }
    else{
        res.render('homepageAuthenticated',{ firstName: req.user.firstName,lastName: req.user.lastName, username: req.user.username })
    }

})
/////////////////////// END /////////////////////






/////////////////      LOGIN ROUTE      //////////////////////
app.get('/login',function (req,res){
    res.render('login');
})
app.post('/login', (req, res) => {
   const user = new User({
       username: req.body.username,
       password: req.body.password
   })
    req.login(user,function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/secrets');
            })}
    })
});

/////////////////////// END /////////////////////









/////////////////////      REGISTER ROUTE    /////////////////
app.get('/register',function (req,res){
    res.render('register');
})
app.post('/register',function(req,res){

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    });

    User.register(newUser, req.body.password, function(err){
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('secrets')
            })
        }
    });
})
/////////////////////// END /////////////////////








/////////////// LOGOUT ROUTE//////////////
app.get("/logout",function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
});

/////////////////////// END /////////////////////












/////////////// CUSTOMER PAGE //////////////////

//MAIN PAGE
app.get('/secrets',function(req,res){
    if(req.isAuthenticated()){
        res.render('secrets',{ firstName: req.user.firstName,lastName: req.user.lastName, username: req.user.username })
    }else{
        res.redirect('/login')
    }
})



//FORM QUOTE
app.get('/formquote',function (req,res){
    if(req.isAuthenticated()) {
        res.render('form_quote', {firstName: req.user.firstName, lastName: req.user.lastName, username: req.user.username})
    }else{
        res.redirect('/login')
    }
})

// Setting Tab
app.get('/updateProfile',function(req,res){
    if(req.isAuthenticated()){
        res.render('updateProfile',{ firstName: req.user.firstName,lastName: req.user.lastName, username: req.user.username })
    }
    else{
        res.redirect('/login')
    }
})


/////////////////////// END /////////////////////





//app.get('/quotehist',function (req,res){
//    res.render('quotehist');
//})


//app.get('/profile',function (req,res){
//    res.render('profile');
//})




app.get('/AboutUs',function (req,res){
    res.render('AboutUs');
})


app.listen(3000,function(){
    console.log(`Server is running on port: ${3000}`)
})
