const express = require('express');
const userModel = require("../models/user");
const router = new express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');

router.post("/register",async (req,res)=>{

    const user = new userModel(req.body);
    try {
        db_res = await user.save();
        res.redirect('/login');
    }
    catch(error) {
        res.status(500).send(error);
    }
});

router.get("/register",(req,res)=>{
    res.render('register');
});

router.post("/login",async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    try
    {
        user = await userModel.findByCredentials(username , password);


        if (!user) {
            res.status(201);
            res.render('login',{'msg' : 'Invalid Username/Password'})
        }
        else
        {
            const token = await user.generateAuthToken();
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
        }
    }
    catch(error)
    {
        res.status(500).send(error)
    }
});

router.get("/login",(req,res)=>{

    res.render('login', {msg : req.flash('msg')});
});

router.get("/logout", auth,(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get("/profile",auth, async (req,res)=>{
    try {
        db_res = await userModel.findOne({username: req.session.username});
        msg = req.session.msg;
        delete req.session.msg;
        res.render('profile', {session: req.session, user: db_res, msg: msg});
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
});

router.post("/profile",auth ,async (req,res)=>{
    try {
        db_res =  await userModel.updateOne({username: req.session.username}, req.body );
        if(req.body.username) req.session.username = req.body.username;
        req.session.msg = "Sucessfully Updated Profile";
        res.redirect('/profile');
    }
    catch(error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;