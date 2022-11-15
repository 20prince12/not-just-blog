const express = require('express');
const userModel = require("../models/users");
const router = new express.Router();
const auth = require('../middlewares/auth');
const ObjectId = require('mongodb').ObjectId;

router.post("/register",async (req,res)=>{
    const user = new userModel(req.body);
    try {
        db_res = await user.save();
        res.status(200).send({'msg':'Registered Successfully'})
    }
    catch(error) {
        console.log(error);
        res.status(501).send({'msg' : 'Internal Server Failure, Please Try to again later.'});
    }
});

router.get("/checkUserExists",async (req,res)=>{
    try {
        db_res = await userModel.findOne(req.query)
        if(db_res) res.status(200).send();
        else res.status(204).send();
    }
    catch(error){
        res.status(501).send({'msg'  :'Internal Server Failure, Please Try to again later.'})
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
        const user = await userModel.findByCredentials(username , password);


        if (!user) {
            res.status(201);
            res.render('login',{'msg' : 'Invalid Username/Password'})
        }
        else
        {
            const token = await user.generateAuthToken();
            req.session.loggedin = true;
            req.session.uid = user._id.toString();
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

router.get("/logout", auth,async (req,res)=>{
    await req.session.destroy();
    res.redirect('/');
})

router.get("/profile",auth, async (req,res)=>{
    try {
        db_res = await userModel.findOne({_id: ObjectId(req.session.uid)});
        res.render('profile', {session: req.session, user: db_res, msg: req.flash('msg')});
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
});

router.post("/profile",auth ,async (req,res)=>{
    try {
        db_res =  await userModel.updateOne({_id: ObjectId(req.session.uid)}, req.body );
        req.flash('msg', 'Profile updated Successfully');
        res.redirect('/profile');
    }
    catch(error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;