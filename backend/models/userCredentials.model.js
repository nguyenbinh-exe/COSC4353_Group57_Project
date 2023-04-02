const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/$, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: true,
        trim: true,

    }
}, {
    timestamps: true,
});

const UserCredentials = mongoose.model('UserCredentials', User);

module.exports = UserCredentials;