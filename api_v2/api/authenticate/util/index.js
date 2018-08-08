const jwt = require('jsonwebtoken');

const createToken = user => {
	if(!user.role) {
		throw new Error('No user tole specified');
	}
	return jwt.sign({
		sub			: user._id,
		email		: user.email,
		role		: user.role,
		iss			: 'api.euriditionlabs.com',
		aud			: 'api.euriditionlabs.com'
	},
	JWT_SECRET, //////////////////////////////////////change this
	{ algorithm: 'HS256', expiresIn: '1h' }
	);
};

modules.exports = { createToken };
