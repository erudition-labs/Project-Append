const User = require('./../model').user;

const createUser = async (userData) => {
	try {
		const newUser = new User(userData);
		return newUser.save();
	} catch(error) {
		return error;
	}
};

const getUserByEmail = async (email) => {
	try {
		return await User.findOne({ email: email });
	} catch(error) {
		return error;
	}
};

const getUserById = async (id) => {
	try {
		return await User.findById(id, {'password' : 0});
	} catch(error) {
		return error;
	}
};

const getUsers = async () => {
	try {
		return await User.find({}, { 'password' : 0 });
	} catch(error) {
		return error;
	}
};

const updateUser = async (id, user) => {
	try {
		return await User.findByIdAndUpdate(id, user, { new: true });
	} catch(error) {
		return error;
	}
};

const deleteUser = async (id) => {
	try {
		return await User.findByIdAndRemove(id);
	} catch(error) {
		return error;
	}
};

module.exports = {
	createUser,
	getUserByEmail,
	getUserById,
	getUsers,
	updateUser,
	deleteUser,
};
