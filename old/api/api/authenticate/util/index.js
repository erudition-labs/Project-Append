const jwt 		= require('jsonwebtoken');
const config 	= require('./../../../database/config'); 

const createToken = user => {
	if(!user.role) {
		throw new Error('No user role specified');
	}
	return jwt.sign({
		sub					: user._id,
		email				: user.email,
		role				: user.role,
		name				: user.fullName,
		iss			: 'api.euriditionlabs.com',
		aud			: 'api.euriditionlabs.com'
	},
		config.secret, //////////////////////////////////////change this
		{ algorithm: 'HS256', expiresIn: '1h' }
	);
};

module.exports = { createToken };
