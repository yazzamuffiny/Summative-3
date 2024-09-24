// require mongoose
const mongoose = require('mongoose')

// create new schema
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

//export model
module.exports = mongoose.model('Comment', commentSchema);