const mongoose             = require('mongoose');
const nev                          = require('email-verification')(mongoose);
const bcrypt                     = require('bcryptjs');
const uniqueValidator    = require('mongoose-unique-validator'); //for unique validation
const User                         = require('./user');

const TempUserSchema = mongoose.Schema({
    firstName    : { type: String, required: true },
    lastName     : {type: String, required: true },
    email            : { type: String, index: true, unique: true, required: true },
    rank             : { type: String, required: true },
    password    : { type: String, required: true },
    GENERATED_VERIFYING_URL : {type: String}
}).plugin(uniqueValidator);

const TempUser = module.exports = mongoose.model('TempUser', TempUserSchema); //name of model and Schema

// hashing function for nev
var hashFunction = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};

nev.configure({
    verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'TempUsers',
    URLFieldName: 'GENERATED_VERIFYING_URL',
    tempUserModel: TempUser,

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'erudition.testing@gmail.com',
            pass: 'jb313327'
        }
    },

    hashingFunction: hashFunction,
    passwordFieldName: 'password',

    verifyMailOptions: {
        from: 'Do Not Reply <erudition.testing_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
    if (error) {
        console.log(error);
        return;
    }
    console.log('nev configured: ' + (typeof options === 'object'));
});
    nev.generateTempUserModel(TempUser, function(err, tempUserModel) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});

module.exports.NEV = nev;
/*
module.exports.addTempUser = function(newUser) {
    nev.createTempUser(newUser, function(error, existingPersistentUser, newTempUser) {
    // some sort of error
    if (error) {
        console.log(error);
    }

    // user already exists in persistent collection...
    if (existingPersistentUser)
        // handle user's existence... violently.

    // a new user
    if (newTempUser) {
        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(email, URL, function(err, info) {
            if (err)
                console.log(error);

            // flash message of success
        });
    } else { // user already exists in temporary collection...
        console.log("user already exists");
        // flash message of failure...
    }
});
}*/
