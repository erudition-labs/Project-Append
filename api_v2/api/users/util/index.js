const bcrypt = require('bcryptjs');

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
	return bcrypt.compare(passwordAttempt, hashPassword);
};

const requireAdmin = (request, response, nect) => {
	if(!request.user) {
		return response.status(401).json({ success: false, msg: 'Problem Authorizing' });
	}

	if(request.user.role !== 'admin') {
		return response.status(401).json({ success: false, msg: 'Insufficient role' });
	}
	next();
};

module.exports = { hashPassword, verifyPassword, requireAdmin };
