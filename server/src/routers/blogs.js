const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');
const postModel = require("../models/posts");
const userModel = require("../models/users");
const {ObjectId} = require("mongodb");



router.get("/get_post",  async (req, res) => {

    try {
        // const Blog = await postModel.find({});
        // for(let i=0;i<Blog.length;i++) {
        //     const user = await userModel.getUserPublicData(ObjectId(Blog[i].uid)) || {};
        //     Blog[i].first_name = user.first_name || "DELETED";
        //     Blog[i].last_name = user.last_name || "USER"
        // };
        const subject = req.query.subject || "";
        const body = req.query.body || "";

        console.log(req.query.subject);
        const posts = await postModel.aggregate([
            {$match : {
                      subject: {$regex: `.*${subject}.*`}
                      ,body: {$regex: `.*${body}.*`}

                }
             },
            { $lookup:
                    {
                        from: 'users',
                        localField: 'uid',
                        foreignField: '_id',
                        as: 'user_data',
                    }
            }
        ]).sort({createdAt : -1});
        res.status(200).send({posts:posts});
    }
    catch(error) {
        res.status(500).send({errors : error});
    }
});

router.post('/create_post',auth,async (req,res)=>{
    const post = new postModel({
        uid : ObjectId(req.session.uid),
        body : req.body.post_body,
        subject : req.body.post_subject,
    });
    try {
        db_res = await post.save();
        res.status(201).send({msg:"ok"});
    }
    catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;



