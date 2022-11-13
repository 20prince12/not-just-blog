const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
    },
    last_name: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: [validateEmail,'Please fill a valid email address2']
    },
    password: {
        type: String,
        required: true,
        minLength:3,
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
    const token = jwt.sign({_id: this._id.toString() } , 'secret');
    return token;
}

UserSchema.statics.getUserPublicData = async function(uid) {
    const user = await Users.findOne({_id : uid} , {password : 0 , createdAt : 0 ,updatedAt : 0} );
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