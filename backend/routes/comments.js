// require express
const express = require('express')

// create router
const router = express.Router()

// controller import
const {
    createComment
} = require('../controllers/commentController')

// http request
router.post(`/listings/:listingId/comments`, createComment);

// module export
module.exports = router
