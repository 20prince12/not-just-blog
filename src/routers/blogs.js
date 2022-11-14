const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');
const postModel = require("../models/posts");
const userModel = require("../models/users");
const {ObjectId} = require("mongodb");



router.get("/get_post",  async (req, res) => {

    try {
        const posts = await postModel.find({});
        for(let i=0;i<posts.length;i++) {
            const user = await userModel.getUserPublicData(ObjectId(posts[i].uid)) || {};
            posts[i].first_name = user.first_name || "DELETED";
            posts[i].last_name = user.last_name || "USER"

        }

        res.status(200).send({posts:posts});
    }
    catch(error) {
        res.status(500).send({errors : error});
    }
});

router.post('/create_post',auth,async (req,res)=>{

    const post = new postModel({
        uid : req.session.uid,
        body : req.body.post_body,
        subject : req.body.post_subject,
    });
    try {
        db_res = await post.save();
        req.flash('msg', 'post created');
        res.redirect('/');
    }
    catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;



