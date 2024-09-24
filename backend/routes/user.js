//call express
const express = require('express');

//create router
const router = express.Router();

// controller import
const {signupUser, loginUser} = require('../controllers/userController');

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

//export route
module.exports = router