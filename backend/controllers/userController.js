const User = require ('../models/userModel');
const jwt = require('jsonwebtoken');

// token creation
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login function
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// sign up function
const signupUser = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, password})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'signup user'})
}

module.exports = {signupUser, loginUser}