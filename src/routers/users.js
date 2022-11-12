const express = require('express');
const userModel = require("../models/user");
const router = new express.Router();
const bcrypt = require('bcryptjs');


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
    res.render('login');
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;