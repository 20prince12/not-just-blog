const express = require('express');
const userModel = require("../models/user");
const router = new express.Router();



router.post("/register",(req,res)=>{
    const user = new userModel(req.body);

    user.save().then((result) => {
        res.redirect('/');
    }, (error) => {
        res.status(500).send("Internal Server Error")
    })
});

router.get("/register",(req,res)=>{
    res.render('register');
});

router.post("/login",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    userModel.findOne({username : username , password : password }).then((result) => {
        if(!result) res.status(201).send("Invalid Passsword/Username");
        else{
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
        }
    }, (error) => {
        res.status(500).send("Internal Server Error")
    })
});

router.get("/login",(req,res)=>{
    res.render('login');
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;