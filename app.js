const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
var _ = require("lodash");
const mongoose = require('mongoose');

const app = express();

mongoose.set('strictQuery',false);



app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// mongoose.connect("mongodb+srv://admin:<password>@cluster0.peg8eaz.mongodb.net/userDB");

app.get('/',function (req,res){
    res.render('homepage');
})

app.get('/signin',function (req,res){
    res.render('SignIn');
})

app.get('/AboutUs',function (req,res){
    res.render('AboutUs');
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



app.listen(3000,function(){
    console.log("Server is running on port 3000")
})

