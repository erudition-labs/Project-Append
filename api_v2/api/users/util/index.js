const bcrypt 	= require('bcryptjs');
const mongoose	= require('mongoose');
const nev		= require('email-verification')(mongoose);
const models	= require('./../model');

const TempUser 	= models.tmpUser;
const User		= models.user;

const hashPassword = password => {
	return new Promise((resolve, reject) => {
		bcryt.genSalt(12, (error, salt) => {
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

const requireAdmin = (request, response, nect) => {
	if(!request.user) {
		return response.status(401).json({ success: false, message: 'Problem Authorizing' });
	}

	if(request.user.role !== 'admin') {
		return response.status(401).json({ success: false, message: 'Insufficient role' });
	}
	next();
};

// hashing function for nev
var hashFunction = function(password, tempUserData, insertTempUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			return insertTempUser(hash, tempUserData, callback);
		});
	});
};

nev.configure({
	verificationURL: 'http://localhost:4200/#/auth/email-verification/${URL}', // set this when we make the front end for it	
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



module.exports = { hashPassword, verifyPassword, requireAdmin };
module.exports.NEV = nev;
