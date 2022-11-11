const express = require('express');
const userModel = require("../models/user");
const router = new express.Router();



router.post("/register",async (req,res)=>{
    const user = new userModel(req.body);
    try {
        db_res = await user.save();
        console.log(db_res);
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
        db_res = await userModel.findOne({username : username , password : password });

        if(!db_res)
        {
            res.status(201).send("Invalid Passsword/Username");
        }
        else
        {
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