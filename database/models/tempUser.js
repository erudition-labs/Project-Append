const mongoose             = require('mongoose');
const bcrypt                     = require('bcryptjs');
const uniqueValidator    = require('mongoose-unique-validator'); //for unique validation

const UserSchema = mongoose.Schema({
    firstName    : { type: String, required: true },
    lastName     : {type: String, required: true },
    email            : { type: String, index: true, unique: true, required: true },
    rank             : { type: String, required: true },
    password    : { type: String, required: true },
    GENERATED_VERIFYING_URL : {type: String}
}).plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', UserSchema); //name of model and Schema
