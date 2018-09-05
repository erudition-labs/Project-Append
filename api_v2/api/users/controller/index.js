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
		role		: request.body.role,
		password	: request.body.password,
		phone	: request.body.phone
	});

	util.NEV.createTempUser(userData, function(error, existingPersistentUser, newTempUser) {
		//some sort of error
		if(error) {
			return response.status(500).json({ success: false, message:'Something went wrong'});
		}

		//user already exists in persistent collection...
		if (existingPersistentUser) {
			//handle user's existence... violently.
			return response.status(418).json({ success: false, message:'User already exists'}); //418 is i am a teapot
		}

		//a new user
		if (newTempUser) {
			let URL = newTempUser[util.NEV.options.URLFieldName];
			util.NEV.sendVerificationEmail(userData.email, URL, function(err, info) {
				if(error) {
					console.log(err);
					return response.status(404).json({success: false, message: 'ERROR: sending verification email FAILED'});
				}
				return response.status(202).json({
					success: true,
					message: 'An email has been sent to you. Please check it to verify your account.',
					info: info
				});
			});
		} else {
				//user already exists in temporary collection...
			console.log("user already exists");
			return response.status(401).json({ success: false, message:'Please Verify Your Email'});
		}
	});
};

const postVerifyResend = async (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(422).json({ errors: errors.array() });
	}

	util.NEV.resendVerificationEmail(request.body.email, function(error, userFound) {
		if(error) {
			return response.status(404).send('ERROR: resending verification email FAILED');
		}

		// the temp user was found
		if(userFound) {
			return response.status(200).json({ success: true, message: 'An email has been sent to you. Please check it to verify your account.'});
		} else {
			// the temp user was not found, meaning the token expired
			return response.status(404).json({ success: false, message: 'Your verification code has expired. Please sign up again.'});
		}
	});
};

const postEmailVerification = async (request, response) => {
	console.log(request.params.token);
	util.NEV.confirmTempUser(request.params.token, function(error, user) { // Nev takes care of url being empty
		if(user) {
			return response.status(201).json({ success: true, message: "Account Confirmed" });
		} else {
			return response.status(404).json({ success:false, message: "Confirmation Failed" });
		}
	});
};


const getUserByEmail = async (request, response) => {
	try {
		const email = request.query.email.toLowerCase();
		const existingEmail = await queries.getUserByEmail(email);

		if(existingEmail) {
			return response.json({ success: true, emailTaken: true });
		}
		return response.json({ success: true, emailTaken: false });
	} catch(error) {
		console.log(error);
		return response.status(400).json({ success: false, message: 'There was a problem checking the email' });
	}
};

const getUsers = async (request, response) => {
	try {
		const users = await queries.getUsers();
		response.json(users);
	} catch(error) {
		console.log(error);
		return error;
	}
};

module.exports = {
	postUser,
	postVerifyResend,
	postEmailVerification,
	getUserByEmail,
	getUsers
};
