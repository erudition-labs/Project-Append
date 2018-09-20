const User = require('./../model').user;
const util = require('./../util');

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
		let user =  await User.findOne({ email: email })
		.populate('events');

		if(!user) return null;
		return util.unescapeUser(user);
	} catch(error) {
		return error;
	}
};

const getUserById = async (id) => {
	try {
		let user = await User.findById(id, {'password' : 0})
		.populate('events');

		return util.unescapeUser(user);
	} catch(error) {
		return error;
	}
};

const getUsers = async () => {
	try {
		let users = await User.find({}, { 'password' : 0 })
		.populate('events');

		users = util.unescapeUserArray(users);
		return users;
	} catch(error) {
		return error;
	}
};

const updateUser = async (id, userData) => {
	try {
		let user = await User.findByIdAndUpdate(id, userData, { new: true })
		.populate('events');

		return util.unescapeUser(user);
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
