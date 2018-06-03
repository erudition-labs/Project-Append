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

nev.configure({
    verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'myawesomewebsite_tempusers',
    tempUserModel: TempUser,

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'myawesomeemail@gmail.com',
            pass: 'mysupersecretpassword'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
    if (error) {
        console.log(error);
        return;
    }

    console.log('configured: ' + (typeof options === 'object'));
});
