const queries 				= require('./../query');
const util 					= require('./../util');
const models				= require('./../model');
const { createToken } 		= require('./../../authenticate/util');
const jwtDecode 			= require('jwt-decode');
const { validationResult }	= require('express-validator/check');
const User					= models.user;

const postUser = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) { // If there are any, respond with them
		return response.status(422).json({ errors: errors.array() });
	}

	let userData = new User({
		firstName	: request.body.firstName,
		lastName	: request.body.lastName,
		email		: request.body.email.toLowerCase(),
		rank		: request.body.rank,
		flight		: request.body.flight,
		team		: request.body.team,
		password	: request.body.password
	});

	util.NEV.createTempUser(newUser, function(error, existingPersistentUser, newTempUser) {
		//some sort of error
		if(error) {
			return response.status(500).json({ success: false, msg:'Something went wrong'});
		}

		//user already exists in persistent collection...
		if (existingPersistentUser) {
			//handle user's existence... violently.
			return response.status(418).json({ success: false, msg:'User already exists'}); //418 is i am a teapot
		}

		//a new user
		if (newTempUser) {
			let URL = newTempUser[util.NEV.options.URLFieldName];
			util.NEV.sendVerificationEmail(newUser.email, URL, function(err, info) {
				if(error) {
					console.log(err);
					return response.status(404).json({success: false, msg: 'ERROR: sending verification email FAILED'});
				}
				return response.status(202).json({
					success: true,
					msg: 'An email has been sent to you. Please check it to verify your account.',
					info: info
				});
			});
		} else {
				//user already exists in temporary collection...
			console.log("user already exists");
			return response.status(401).json({ success: false, msg:'Please Verify Your Email'});
		}
	});
};


const getUserByEmail = async (request, response) => {
	try {
		const email = request.body.email.toLowerCase();
		const existingEmail = await queries.getUserByEmail(email);

		if(existingEmail) {
			return response.json({ success: true, emailTaken: true });
		}
		return response.json({ success: true, emailTaken: false });
	} catch(error) {
		return response.status(400).json({ success: false, msg: 'There was a problem checking the email' });
	}
};

module.exports = {postUser, getUserByEmail };
