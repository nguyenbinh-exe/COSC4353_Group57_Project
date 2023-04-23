require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
var _ = require("lodash");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;



const app = express();
const port = process.env.PORT || 3000
mongoose.set('strictQuery',false);


app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


//connect database;
// mongoose.connect('mongodb+srv://admin:Group57@cluster0.peg8eaz.mongodb.net/userDB');
mongoose.connect('mongodb://0.0.0.0:27017/Group57DB')
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database established!");
})



// USER SCHEMA//
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})
const User = new mongoose.model('User',userSchema)






// set routes - Tung
const profileRoute = require('./backend/routes/profile');
const quotehistRoute = require('./backend/routes/quotehist');

// connect routes - Tung
app.use('/', profileRoute);
app.use('/', quotehistRoute);

app.get('/',function (req,res){
    res.render('homepage');
})





///////////////// LOGIN ROUTE //////////////////////
app.get('/login',function (req,res){
    res.render('login');
})
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(401).send('Email or password is incorrect');
            }
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Internal server error');
                }
                if (result) {
                    res.render('secrets');
                } else {
                    return res.status(401).send('Email or password is incorrect');
                }
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
});

/////////////////////// END /////////////////////



/////////////////////      REGISTER ROUTE    /////////////////
app.get('/register',function (req,res){
    res.render('register');
})
app.post('/register',function(req,res){

    bcrypt.hash(req.body.password, saltRounds,function(err,hash){
        const newUser = new User({
            email: req.body.email,
            password: hash
        })
        newUser.save().then(()=>{
            console.log('User saved')
            res.render('secrets')
        }).catch(error=>{
            console.error(error)
        })
    })

})
/////////////////////// END /////////////////////

//app.get('/profile',function (req,res){
//    res.render('profile');
//})


// app.get('/secrets',function(req,res){
//     res.render('secrets')
// })

app.get('/formquote',function (req,res){
    res.render('form_quote');
})

app.get('/AboutUs',function (req,res){
    res.render('AboutUs');
})


//app.get('/quotehist',function (req,res){
//    res.render('quotehist');
//})



app.listen(port,function(){
    console.log(`Server is running on port: ${port}`)
})

// Class for Pricing Module
class pricing_module
{

}