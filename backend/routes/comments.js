// require express
const express = require('express')

// create router
const router = express.Router()

// controller import
const {
    getComments,
    createComment
} = require('../controllers/commentController')

// http request
router.get('/', getComments)
router.post('/', createComment)

// module export
module.exports = router
