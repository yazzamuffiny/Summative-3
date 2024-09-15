//call mongoose
const mongoose = require('mongoose');

//call schema
const Schema = mongoose.Schema

//create schema
const listingSchema = new Schema({
    breed: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    number_available: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    additional_info: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Listing', listingSchema);