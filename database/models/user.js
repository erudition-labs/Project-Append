const mongoose             = require('mongoose');
const bcrypt                     = require('bcryptjs');
const uniqueValidator    = require('mongoose-unique-validator'); //for unique validation

const UserSchema = mongoose.Schema({
    firstName    : { type: String, required: true },
    lastName     : {type: String, required: true },
    email            : { type: String, index: true, unique: true, required: true },
    rank             : { type: String, required: true },
    password    : { type: String, required: true }
}).plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', UserSchema); //name of model and Schema

module.exports.findUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.findUserByEmail = function(email, callback) {
    const query = {email:email}
    User.findOne(query, callback);
}

/*
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => { //newUser.password
            if(error) throw error;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
*/
module.exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (error, isMatch) => {
        if(error) throw error;
        callback(null, isMatch);
    });
}

module.exports.findAllUsers = function(callback) {
    User.find({}, callback);
}

module.exports.findAndDeleteUserById = function(id, callback) {
    User.findByIdAndRemove(id, callback);
}
