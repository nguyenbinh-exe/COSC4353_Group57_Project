const express = require("express");
var router = express.Router();

router.get('/',function (req,res){
    if(req.isAuthenticated()){
        res.redirect('/loggedin')
    }else{
        res.render('homepage')
    }
})

router.get('/AboutUs',function (req,res){
    res.render('AboutUs');
})

module.exports = router;