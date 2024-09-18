// comment model import
const Comment = require('../models/commentModel')
const Listing = require('../models/listingModel')

// mongoose import 
const mongoose = require('mongoose')

// get all comments method
// const getComments = async (req, res) => {
//     const comments = await Comment.find({}).sort({createdAt: -1})
//     res.status(200).json(comments)
// }

// create comments method
const createComment = async (req, res) => {
    const { listingId } = req.params;

    try {
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        const newComment = new Comment({
            text: req.body.text,
            user_id: req.body.user_id
        });

        await newComment.save();

        listing.comments.push(newComment);
        await listing.save();

        res.status(201).json(newComment);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// export functions
module.exports = {
    createComment
}