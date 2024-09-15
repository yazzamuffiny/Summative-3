// comment model import
const Comment = require('../models/commentModel')

// mongoose import 
const mongoose = require('mongoose')

// get all comments method
const getComments = async (req, res) => {
    const comments = await Comment.find({}).sort({createdAt: -1})
    res.status(200).json(comments)
}

// export functions
module.exports = {
    getComments,
}