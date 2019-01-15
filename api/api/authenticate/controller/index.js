const { getUserByEmail 		} = require('./../../users/query');
const { verifyPassword 		} = require('./../../users/util');
const { createToken 		} = require('./../util');
const { validationResult 	} = require('express-validator/check');
const util = require('../../users/util');
const jwtDecode = require('jwt-decode');

const postAuthenticate = async (request, response) => {
	try {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(422).json({ errors: errors.array() });
		}

		const email 	= request.body.email;
		const password 	= request.body.password;
		
		var user 				= await getUserByEmail(email);
		if(!user) return response.json({ success: false, message: 'Wrong email or password' });
		const isValidPassword 	= await verifyPassword(password, user.password);

		

		if(isValidPassword) {
			const token 		= createToken(user);
			const decodedToken 	= jwtDecode(token);
			const expiresAt 	= decodedToken.exp;
			user = util.unescapeUser(user);

			const userInfo = {
				email		: user.email,
				firstName	: user.firstName,
				role		: user.role
			};

			response.json({ success: true, message: 'Authentication Successful', 
				token,
				userInfo,
				expiresAt
			});
		} else {
			response.json({ success: false, message: 'Wrong email or password' });
		}
	} catch(error) {
		console.log(error);
		return response.status(400).json({ success: false, message: 'Something went wrong' });
	}
};

module.exports = { postAuthenticate };
