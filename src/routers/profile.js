const express = require('express');
const userModel = require("../models/user");
const router = new express.Router();


router.get("/profile",async (req,res)=>{
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

router.post("/profile",async (req,res)=>{
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
//
module.exports = router;