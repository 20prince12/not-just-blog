const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');



router.get("/messages",auth, (req,res)=>{

    res.render('messages',{session: req.session});
});




module.exports = router;