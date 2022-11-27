const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');
const postModel = require("../models/posts");
const userModel = require("../models/users");
const {ObjectId} = require("mongodb");



router.get("/api/get_post",auth,  async (req, res) => {
    try {
        const subject = req.query.subject || "";
        const body = req.query.body || "";
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

router.post('/api/create_post',auth,async (req,res)=>{

    const post = new postModel({
        uid : ObjectId(req.body.uid),
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



