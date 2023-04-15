const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const fuelQuote = new Schema({
    clientID: {
        type: String,
        required: true,
        trim: true,
    },
    gallonsRequested: {
        type: Number,
        required: true,
        trim: true,
    },
    suggestedPrice: {
        type: Number,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const quoteHistory = mongoose.model('fuel_quotes', fuelQuote);

module.exports =  quoteHistory; 