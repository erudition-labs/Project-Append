//Add all routes that users can access here
const express									= require('express');
const User										= require('../database/models/user');
const passport									= require('passport');
const jwt										= require('jsonwebtoken');
const { body, check, validationResult }			= require('express-validator/check');
const { sanitizeBody }							= require('express-validator/filter');
const config									= require('../database/config/database');
const router									= express.Router();

/////////////////////add passport.authenticate('jwt', {session: false}) as a parameter to protect a route.


// return array of all users in users collection
router.get('/users', (request, response, next) => {
	User.findAllUsers((error, users) => {
		if(error) {
			return response.status(500).json({success: false, msg: 'Failed to get users'});
		} else {
			let userArray = [];

			users.forEach(function(user) {
				userArray.push(user);
			});
            
			if(!userArray.length) { // array is empty meaning there are no users in the db
				return response.status(404).json({success: true, msg: 'No Users'})
			}
			return response.status(200).send(userArray); //otherwise there are users
		}
	});
});

//delete user by id
router.delete('/:id', (request, response, next) => {
	User.findAndDeleteUserById(request.params.id, (error, user) => {
		if(error) {
			return response.status(500).json({success: false, msg: error});
		} else {
			return response.status(200).json({success: true, msg: 'Removed User'});
		}
	});
});

//profile
// Note that passport will set a user object with  passport.authenticate() if the token is calid
router.get('/profile', passport.authenticate('jwt', {session: false}), (request, response, next) => {
	return response.status(200).json({user:request.user});
});

module.exports = router;
