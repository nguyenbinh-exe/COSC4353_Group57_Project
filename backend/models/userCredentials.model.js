const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {

    }
}, {
    timestamps: true,
});

const UserCredentials = mongoose.model('UserCredentials', User);

module.exports = UserCredentials;