const bcrypt 	= require('bcryptjs');
const mongoose	= require('mongoose');
const nev		= require('email-verification')(mongoose);
const models	= require('./../model');
const validator = require('validator');


const TempUser 	= models.tmpUser;
const User		= models.user;

const hashPassword = password => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (error, salt) => {
			if(error) {
				reject(error);
			}

			bcrypt.hash(password, salt, (error, hash) => {
				if(error) {
					reject(error);
				}
				resolve(hash);
			});
		});
	});
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
	return bcrypt.compare(passwordAttempt, hashedPassword);
};

const requireAdmin = (request, response, next) => {
	if(!request.user) {
		return response.status(401).json({ success: false, message: 'Problem Authorizing' });
	}

	if(request.user.role !== 'admin') {
		return response.status(401).json({ success: false, message: 'Insufficient role' });
	}
	next();
};

const unescapeUser = (user) => {
	if(user.firstName) 		user.firstName		= validator.unescape(user.firstName);
	if(user.lastName) 		user.lastName		= validator.unescape(user.lastName);
	if(user.rank) 			user.rank			= validator.unescape(user.rank);
	if(user.flight) 		user.flight			= validator.unescape(user.flight);
	if(user.team) 			user.team 			= validator.unescape(user.team);
	if(user.email) 			user.email			= validator.unescape(user.email);
	if(user.phone) 			user.phone			= validator.unescape(user.phone);
	if(user.role) 			user.role			= validator.unescape(user.role);
	return user;
};

const unescapeUserArray = (users) => {
	for(let i=0; i<users.length; i++) {
		users[i] = unescapeUser(users[i]);
	}
	return users;
}

// hashing function for nev
var hashFunction = function(password, tempUserData, insertTempUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			return insertTempUser(hash, tempUserData, callback);
		});
	});
};

nev.configure({
	verificationURL: 'http://cadet.ca782.org/mail-confirm/${URL}', // set this when we make the front end for it	
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



module.exports = { 
	hashPassword, 
	verifyPassword, 
	requireAdmin, 
	unescapeUser,
	unescapeUserArray
};
module.exports.NEV = nev;
