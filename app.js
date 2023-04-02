const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
var _ = require("lodash");
const mongoose = require('mongoose');



const app = express();
const port = process.env.PORT || 3000
mongoose.set('strictQuery',false);

//connect database;
mongoose.connect('mongodb+srv://admin:Group57@cluster0.peg8eaz.mongodb.net/userDB');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database established!");
})

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



// create a route for profile management - Tung
const profileRoute = require('./backend/routes/profile');
// connect 'profile' to its route - Tung
app.use('/', profileRoute);

app.get('/',function (req,res){
    res.render('homepage');
})

app.get('/signin',function (req,res){
    res.render('SignIn');
})

app.get('/AboutUs',function (req,res){
    res.render('AboutUs');
})

app.get('/profile',function (req,res){
    res.render('profile');
})

app.get('/register',function (req,res){
    res.render('register');
})

app.get('/formquote',function (req,res){
    res.render('form_quote');
})

app.get('/quotehist',function (req,res){
    res.render('quotehist');
})



app.listen(port,function(){
    console.log(`Server is running on port: ${port}`)
})

// Class for Pricing Module
class pricing_module
{

}