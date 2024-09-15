// comment model import
const Comment = require('../models/commentModel')

// mongoose import 
const mongoose = require('mongoose')

// get all comments method
const getComments = async (req, res) => {
    const comments = await Comment.find({}).sort({createdAt: -1})
    res.status(200).json(comments)
}

// create comments method
const createComment = async (req, res) => {
    const {user_id, text} = req.body

    try {
        const comment = await Comment.create({user_id, text})
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// export functions
module.exports = {
    getComments,
    createComment
}