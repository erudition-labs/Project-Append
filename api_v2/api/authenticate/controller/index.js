const { getUser 			} = require('./../../users/query');
const { verifyPassword 		} = require('./../../users/util');
const { createToken 		} = require('./../util');
const jwtDecode = require('jwt-decode');

const postAuthenticate = async (request, response) => {
	try {
		const email 	= request.body.email;
		const password 	= request.body.password;
		
		const user 				= await getUser(email);
		const isValidPassword 	= await verifyPassword(password, user.password);

		if(isValidPassword) {
			const token 		= createToken(user);
			const decodedToken 	= jwtDecode(token);
			const expiresAt 	= decodedToken.exp;

			const userInfo = {
				email: user.email,
				role:  user.role
			};

			response.cookie('token', token, { maxAge: 360000, httpOnly: true });

			response.json({ success: true, msg: 'Authentication Successful', 
				token,
				userInfo,
				expiresAt
			});
		} else {
			response.status(403).json({ success: false, msg: 'Wrong email or password' });
		}
	} catch(error) {
		console.log(error);
		return response.status(400).json({ success: false, msg: 'Something went wrong' });
	}
};

module.exports = { postAuthenticate };
