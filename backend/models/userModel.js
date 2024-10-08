//call mongoose
const mongoose = require('mongoose');

//import email and password security
const bcrypt = require('bcrypt');
const validator = require('validator');

//call schema
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static for signup
userSchema.statics.signup = async function (email, password) {
    if(!email || !password) {
        throw Error ('All Fields Must Be Filled In')
    }
    
    if (!validator.isEmail(email)) {
        throw Error ('Is Not A Valid Email')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error ('Password Is Not Strong Enough')
    }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error ('Email Is Already In Use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({email, password: hash});

    return user
}

//static for login
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error ('All Fields Must Be Filled In');
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error ('Incorrect Email');
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error ('Incorrect Password');
    }

    return user
}

module.exports = mongoose.model('User', userSchema);