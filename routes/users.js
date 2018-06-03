//Add all routes that users can access here
const express                                           = require('express');
const User                                                = require('../database/models/user');
const TempUser                                      = require('../database/models/tempUser');
const passport                                         = require('passport');
const jwt                                                    = require('jsonwebtoken');
const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody }                              = require('express-validator/filter');
const config                                               = require('../database/config/database');
const router                                               = express.Router();

/////////////////////add passport.authenticate('jwt', {session: false}) as a parameter to protect a route.

router.get('/email-verification/:URL', (request, response, next) => {
    TempUser.NEV.confirmTempUser(url, function(error, user) {
        if(user) {
            response.json({ success: true, msg: "Account Confirmed" });
        } else {
            response.json({ success:false, msg: "Confirmation Failed" });
        }
    });
});


//Register
router.post('/register', [
    // validate and sanitize any fields from the client
    // Note that this does in place field mutation
    body('email').exists().isEmail().withMessage('Valid Email Required').normalizeEmail(),
    body('firstName').exists().withMessage('First Name Required').trim().escape(),
    body('lastName').exists().withMessage('Last Name Required').trim().escape(),
    body('rank').exists().withMessage('Rank Required').trim().escape() //for now just sanitize rank, eventually we can check if it is a valid rank
], (request, response, next) => {
    // check for any errors from above
    const errors = validationResult(request);
    if (!errors.isEmpty()) { // If there are any, respond with them
        return response.status(422).json({ errors: errors.array() });
    }
    // otherwise create a user object based off of our schema
    let newUser = new User({
        firstName    : request.body.firstName,
        lastName    : request.body.lastName,
        email           : request.body.email,
        rank            : request.body.rank,
        password   : request.body.password
    });

    TempUser.NEV.createTempUser(newUser, function(error, existingPersistentUser, newTempUser) {
        // some sort of error
        if (error) {
            response.json({ success: false, msg:'Something went wrong'});
        }

        // user already exists in persistent collection...
        if (existingPersistentUser) {
            // handle user's existence... violently.
            response.json({ success: false, msg:'User already exists'});
        }

        // a new user
        if (newTempUser) {
            let URL = newTempUser[TempUser.NEV.options.URLFieldName];

            TempUser.NEV.sendVerificationEmail(newUser.email, URL, function(err, info) {
                if (err) {
                    console.log(err);
                    return response.status(404).send('ERROR: sending verification email FAILED');
                }
                response.json({
                    msg: 'An email has been sent to you. Please check it to verify your account.',
                    info: info
                });

            });
        } else { // user already exists in temporary collection...
            console.log("user already exists");
            response.json({ success: false, msg:'Please Verify Your Email'});
        }
    });
});

// resend email verification
router.post('/verify-resend', [
    body('email').isEmail().withMessage('Valid Email Required').normalizeEmail()
], (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }

        TempUser.NEV.resendVerificationEmail(request.body.email, function(error, userFound) {
            if (error) {
                return response.status(404).send('ERROR: resending verification email FAILED');
            }

            if (userFound) { // the temp user was found
                response.json({ success: true, msg: 'An email has been sent to you. Please check it to verify your account.'});
            } else {
                // the temp user was not found, meaning the token expired
                response.json({ success: false, msg: 'Your verification code has expired. Please sign up again.'});
            }
        });
});


// Authenticate user and return a token if valid
router.post('/authenticate', [
    //validate and sanitize
    body('email').isEmail().withMessage('Valid Email Required').normalizeEmail()
], (request, response, next) => {
    // Check for validation/sanitization errors
    const errors = validationResult(request);
    if (!errors.isEmpty()) { // If there are any, respond with them
        return response.status(422).json({ errors: errors.array() });
    }

    //otherwise continue
    const email = request.body.email;
    const password = request.body.password;

    User.findUserByEmail(email, (error, user) => {
        if(error) throw error;
        if(!user) {
            return response.json({success: false, msg: 'User not found :('});
        } // when user is not in db

        // otherwise assume it is, check the rest of the stuff
        // Note that we are comparing hashed passwords
        User.comparePassword(password, user.password, (error, isMatch) => {
            if(error) throw error;
            if(isMatch) {
                //create the token
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 3600 //1 day
                });

                response.json({
                    success : true,
                    token   : 'JWT '+token,
                    user    : {               //send back data for a profile or something
                        id      : user._id,
                        name    : user.username,
                        email   : user.email,
                        access  : user.access
                    }
                });
            } else {
                //no match
                return response.json({success:false, msg: 'Incorrect Password'});
            }
        });
    });
});

// return array of all users in users collection
router.get('/users', (request, response, next) => {
    User.findAllUsers((error, users) => {
        if(error) {
            response.status(500).json({success: false, msg: error});
        } else {
            var userMap = [];

            users.forEach(function(user) {
                userMap[user._id] = user;
            });
            response.status(200).send(userMap);
        }
    });
});

//delete user by id
router.delete('/user/:id', (request, response, next) => {
    User.findAndDeleteUserById(request.params.id, (error, user) => {
        if(error) {
            response.status(500).json({success: false, msg: error});
        } else {
            response.status(200).json({success: true, msg: 'Removed User'});
        }
    });
});

//Profile
router.get('/user', passport.authenticate('jwt', {session: false}), (request, response, next) => {
    response.json({user:request.user});
});

module.exports = router;
