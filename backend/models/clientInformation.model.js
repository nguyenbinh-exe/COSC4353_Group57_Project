const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientInfo = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    address1: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    address2: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100
    },
    city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    state: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2
    },
    zipcode: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 9,
        minlength: 5
    },

}, {
    timestamps: true,
});

const ClientInformation = mongoose.model('Client_Info', clientInfo);

module.exports =  ClientInformation; 