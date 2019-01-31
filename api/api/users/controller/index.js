const queries 				= require('./../query');
const models				= require('./../model');
const { createToken } 		= require('./../../authenticate/util');
const jwtDecode 			= require('jwt-decode');
const { validationResult }	= require('express-validator/check');
const User					= models.user;
const util 					= require('../util');
const path = require("path");


const bcrypt 			= require('bcryptjs');
var async				= require('async');
var crypto 				= require('crypto');


var  hbs = require('nodemailer-express-handlebars'),
email = process.env.MAILER_EMAIL_ID || 'erudition.testing@gmail.com',
pass = process.env.MAILER_PASSWORD || 'jb313327'
nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
auth: {
	user: email,
	pass: pass
}
});

var handlebarsOptions = {
viewEngine: 'handlebars',
viewPath: path.resolve('api/templates'),
extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));



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
		phone		: request.body.phone,
		fullName	: request.body.fullName
	});

	util.NEV.createTempUser(userData, function(error, existingPersistentUser, newTempUser) {
		//some sort of error
		if(error) {
			console.log(error);

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

const getUser = async (request, response) => {
	try {
		const userId = request.params.id;
		const user = await queries.getUserById(userId);

		return response.json({success: true, result: user});
	} catch(error) {
		console.log(error);
		response.json({success: false, message: "Failed to get User"});
		return error;
	}
};

const getUsers = async (request, response) => {
	try {
		const users = await queries.getUsers();
		response.json({ success: true, result: users});
	} catch(error) {
		console.log(error);
		response.json({ success: false, message: "Failed to get Users" });
		return error;
	}
};

const putUser = async (request, response) => {
	
	try {
		const userId = request.params.id;
		const userData = request.body.userData;

		const updatedUser = await queries.updateUser(userId, userData);
		var socketio = request.app.get('socketio');
		socketio.sockets.emit('Data Sync', 'Data Sync');
		response.json({ success: true, result: updatedUser, message: "Successfully Updated User" });
	} catch(error) {
		response.json({ success: false, message: "Unsuccessfully Updated User" });
		return error;
	}
};

const deleteUser = async (request, response) => {
	try {
		const userId = request.params.id;
		await queries.deleteUser(userId);
		response.json({success: true, message: 'User deleted'});
	} catch(error) {
		response.json({success: false, message: 'Failed to delete user'});
		return error;
	}
};


const passwordResetRequest = async (request, response, next) => {
	async.waterfall([
		function(done) {
		  crypto.randomBytes(20, function(err, buf) {
			var token = buf.toString('hex');
			done(err, token);
		  });
		},
		function(token, done) {
		  User.findOne({ email: request.body.email }, function(err, user) {
			if (!user) {
				response.json({ success:false, message: "Email doesn't exist"});
			}
	
			user.resetPasswordToken = token;
			user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	
			user.save(function(err) {
			  done(err, token, user);
			});
		  });
		},
		function(token, user, done) {

			var data = {
        to: user.email,
        from: email,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url: 'http://cadet.ca782.org/reset-password/' + token,
          name: user.firstName
        }
      };

			smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return response.json({ success: true, message: 'Recovery email has been sent to you.' });
        } else {
          return done(err);
        }
     	 });
			}
	  ], function(err) {
		if (err) return next(err);
	  });

};

const passwordReset = async (request, response, next) => {
	async.waterfall([
		function(done) {
		  User.findOne({ resetPasswordToken: request.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				return response.json({ success: false, message: "Invalid Token" });
			}
	
			util.hashPassword(request.body.password).then( hash => {
				user.resetPasswordToken = undefined;
				user.resetPasswordExpires = undefined;
				user.password = hash;
		
				user.save(function(err) {
					done(err, user);
				});
			});
		});
	},
		function(user, done) {
		  var data = {
				to: user.email,
				from: email,
				template: 'reset-password-email',
				subject: 'Password Reset Confirmation',
				context: {
					name: user.firstName
				}
			};

			smtpTransport.sendMail(data, function(err) {
				if (!err) {
					return response.json({ success: true, message: 'Password reset' });
				} else {
					return done(err);
				}
			});
			}
	  ], function(err) {
		response.json({ success: false, message: "Something went worng" });
	  });
};

module.exports = {
	postUser,
	postVerifyResend,
	postEmailVerification,
	getUserByEmail,
	getUser,
	getUsers,
	putUser,
	deleteUser,
	passwordResetRequest,
	passwordReset
};
