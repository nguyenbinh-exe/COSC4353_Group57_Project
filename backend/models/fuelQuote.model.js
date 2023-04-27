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
    deliveryAddress: {        
            address1: String,
            address2: String,
            city: String,
            state: String,
            zipcode: String   
    },    
    deliveryDate: {
        type: Date,
        required: false,
        trim: false,
    },

    suggestedPrice: {
        type: Number,
        required: true,
        trim: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
    
});

const quoteHistory = mongoose.model('fuel_quotes', fuelQuote);

module.exports =  quoteHistory; 