// require express
const express = require('express')

// create router
const router = express.Router()

// controller import
const {
    getComments,
} = require('../controllers/commentController')

// http request
router.get('/', getComments)

// module export
module.exports = router
