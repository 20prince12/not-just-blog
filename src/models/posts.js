const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
    },
    subject: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
    },
    body: {
        type: String,
        required: true,
        minLength: 3,
        trim:true,
    },
},{
    versionKey: false,
    timestamps: true,
});

const Posts = mongoose.model("post", UserSchema);

module.exports = Posts;