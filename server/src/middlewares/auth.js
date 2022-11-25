const User = require('../models/users');
const jwt = require('jsonwebtoken');

const auth = async (req , res , next) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secret_key')
        const user =  await User.findOne({ _id: decoded._id })
        if(user) next();
        else     res.status(401).send({msg : 'Unauthorized'});
    } catch (error) {
        res.status(401).send({msg : 'Unauthorized'});
    }
}

module.exports =auth;