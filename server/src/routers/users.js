const express = require('express');
const userModel = require("../models/users");
const router = new express.Router();
const auth = require('../middlewares/auth');
const ObjectId = require('mongodb').ObjectId;

router.post("/api/register",async (req,res)=>{
    //const data =  JSON.parse(req.body);
    console.log(req.body);
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

router.get("/api/checkUserExists",async (req,res)=>{
    try {
        db_res = await userModel.findOne(req.query)
        if(db_res) res.status(200).send();
        else res.status(204).send();
    }
    catch(error){
        res.status(501).send({'msg'  :'Internal Server Failure, Please Try to again later.'})
    }
});

router.get("/api/register",(req,res)=>{
    res.render('register');
});



router.post("/api/login",async (req,res)=>{

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
            res.status(200).send({authToken:token})
        }
    }
    catch(error)
    {
        res.status(500).send(error)
    }
});

router.get("/api/login",(req,res)=>{

    res.render('login', {msg : req.flash('msg')});
});

router.get("/api/logout", auth,async (req,res)=>{
    await req.session.destroy();
    res.redirect('/');
})

router.get("/api/profile",auth, async (req,res)=>{
    try {
        db_res = await userModel.findOne({_id: ObjectId(req.session.uid)});
        res.render('profile', {session: req.session, user: db_res, msg: req.flash('msg')});
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
});

router.post("/api/profile",auth ,async (req,res)=>{
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