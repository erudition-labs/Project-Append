const mongoose    = require('mongoose');
const bcrypt            = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name    : { type: String, required: true },
    email   : { type: String, required: true },
    access  : { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = module.exports = mongoose.model('User', UserSchema); //name of model and Schema

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username:username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => { //newUser.password
            if(error) throw error;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (error, isMatch) => {
        if(error) throw error;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function(callback) {
    User.find({}, callback);
}

module.exports.findAndUpdateIssue = function(id, data, options, callback) {
    User.findByIdAndUpdate(id, data, options, callback);
}

module.exports.findAndDeleteUserById = function(id, callback) {
    User.findByIdAndRemove(id, callback);
}
