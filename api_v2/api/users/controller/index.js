const queries 			= require('./../query');
const util 				= require('./../util');
const { createToken } 	= require('./../../authentiate/util');
const jwtDecode 		= require('jwt-decode');

const postUser = async (request, response) => {
	try {
		const hashedPassword = await util.hashPassword(request.body.password);
	
		const userData = {
			email: request.body.toLowerCase(),
			password: hashedPassword
		};

		const existingEamil = await queries.getUserByEmail(userData.email);
		if(existingEmail) {
			return response.status(400).json({ success: false, msg: 'Email already exists' });
		}

		const user = await queries.createUser(userData);
		if(user) {
			const token 		= createToken(user);
			const decodedToken 	= jwtDecode(token);
			const expiresAt 	= decodedToken.exp;

			const UserInfo = {
				email: user.email,
				role:  user.role
			};

			response.cookie('token', token, { maxAge: 360000, httpOnly: true });
			return response.json({ success: true, msg: 'User Created!', 
				token,
				userinfo,
				expiresAt
			});
		} else {
			response.status(400).json({ success: false, msg: 'There was a problem creating your account' });
		}
	} catch(error) {
		return response.status(400).json({ success: false, msg: 'There was a problem creating your account' });
	}
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
