const User = require('./../model').user;

const createUser = async userData => {
	try {
		const newUser = new User(userData);
		return newUser.save();
	} catch(error) {
		return error;
	}
};

const getUserByEmail = async email => {
	try {
		return await User.findOne({ email: email });
	} catch(error) {
		return error;
	}
};

module.exports = { createUser, getUserByEmail };
