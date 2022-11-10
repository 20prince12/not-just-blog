const mongoose = require("mongoose");

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
        trim:true,
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: [validateEmail,'Please fill a valid email address2']
    },
    password: {
        type: String,
        required: true,
        minLength:3,
        trim:true
    }
},{collection:'user',
    versionKey: false
});

const User = mongoose.model("user", UserSchema);

module.exports = User;