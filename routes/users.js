//Add all routes that users can access here
const express   = require('express');
const User         = require('../database/models/user');
const passport  = require('passport');
const jwt            = require('jsonwebtoken');
const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const config      = require('../database/config/database');
const router      = express.Router();

/////////////////////add passport.authenticate('jwt', {session: false}) as a parameter to protect a route.

//Register
router.post('/register', [
    body('email').isEmail().withMessage('Valid Email Required').normalizeEmail(),
    body('firstName').not().isEmpty().withMessage('First Name Required').trim().escape(),
    body('lastName').not().isEmpty().withMessage('Last Name Required').trim().escape(),
    body('rank').not().isEmpty().withMessage('Rank Required').trim().escape() //for now just sanitize rank, eventually we can check if it is a valid rank
], (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }

    let newUser = new User({
        firstName    : request.body.firstName,
        lastName    : request.body.lastName,
        email           : request.body.email,
        rank            : request.body.rank,
        password   : request.body.password
    });

    User.addUser(newUser, (error, user) => {
        if(error) {
            response.json({ success: false, msg:'Failed To Register User'});
        } else {
            response.json({ success: true, msg:'User Registered'});
        }
    });
});

//Authenticate
router.post('/authenticate', (request, response, next) => {
    const username = request.body.username;
    const password = request.body.password;

    User.findUserByEmail(username, (error, user) => {
        if(error) throw error;
        if(!user) {
            return response.json({success: false, msg: 'User not found :('});
        } //when user is not in db

        //otherwise assume it is, check the rest of the stuff
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



router.delete('/users/:id', (request, response, next) => {
    User.finAndDeleteUserById(request.params.id, (error, user) => {
        if(error) {
            response.status(500).json({success: false, msg: error});
        } else {
            response.status(200).json({success: true, msg: 'Removed User'});
        }
    });
});


//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (request, response, next) => {
    response.json({user:request.user});
});



module.exports = router;
