const mongoose = require('mongoose');
//const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema;

const User = new Schema({
    username: {    
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

User.plugin(passportLocalMongoose)
const UserCredentials = mongoose.model('user_credentials', User);

module.exports = UserCredentials;