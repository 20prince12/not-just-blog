const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = {
    password : { max : 30 , min : 8 , match : {regex : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/ , description : 'Should be combination of Number , Alphabit , Special Characters'}},
    email : { match : {regex : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , description : 'Enter a valid Email Address'}},
    first_name : { min : 3 , max : 30 , match : {regex : /^[a-zA-Z\-]+$/ , description : 'Name should contain only English Alphabits'}},
    last_name  : { min:3 , max : 30 , match : {regex : /^[a-zA-Z\-]+$/ , description : 'Name should contain only English Alphabits'}},
    username : { min:3 , max : 30 ,match : {regex : /^[A-Za-z][A-Za-z0-9_]*$/ , description : 'Username should start with Alphabits and Should not contain Special characters.'}},
}

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: config.first_name.min,
        maxLength: config.first_name.max,
        match: [config.first_name.match.regex, config.first_name.match.description],
        trim:true,
    },
    last_name: {
        type: String,
        required: true,
        minLength: config.last_name.min,
        maxLength: config.last_name.max,
        match: [config.last_name.match.regex, config.last_name.match.description],
        trim:true,
    },
    username: {
        type: String,
        required: true,
        minLength: config.username.min,
        maxLength: config.username.max,
        match: [config.username.match.regex, config.username.match.description],
        unique: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        minLength: config.email.min,
        maxLength: config.email.max,
        trim:true,
        unique: true,
        lowercase: true,
        match: [config.email.match.regex, config.email.match.description],
    },
    password: {
        type: String,
        required: true,
        minLength:config.password.min,
        maxLength: config.password.max,
        match: [config.password.match.regex, config.password.match.description],
        trim:true
    }
},{
    versionKey: false,
    timestamps: true,
});

UserSchema.pre('save' ,async function(next) {
    if (!this.password) return next();
    try {
        this.password = await bcrypt.hash(this.password , 8);
        next();
    }
    catch (error) {
        return next(error);

    }
});

UserSchema.pre('updateOne' ,async function(next) {

    if (!this.getUpdate().password) return next();
    try {
        this.getUpdate().password = await bcrypt.hash(this.getUpdate().password , 8);
        next();
    }
    catch (error) {
        return next(error);
    }
});

UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id } , process.env.SECRET_KEY || 'secret_key');
    return token;
}

UserSchema.statics.getUserPublicData = async function(uid) {
    const user = await Users.findOne({_id : uid} , {password : 0 , createdAt : 0 ,updatedAt : 0});
    return user;
}

UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await Users.findOne({username : username} );
    if (!user) return;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return;

    return user;
}
const Users = mongoose.model("user", UserSchema);

module.exports = Users;