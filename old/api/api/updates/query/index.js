const Update   = require('./../model');
const User      = require('../../users/model');

const getUpdates = async () => {
    try {
        return await Update.find().sort({ date: 'descending' }).limit(12).populate('author');
    } catch(error) {
        return error;
    }
};

const createUpdate = async (updateData) => {
	try {
		const newUpdate = new Update(updateData);
		return await newUpdate.save();
	} catch(error) {
		console.log(error);
		return error;
	}
};

const editUpdate = async (id, update) => {
	try {
		return await Update.findByIdAndUpdate(id, update, { new: true }).populate('author', {password: 0});
	} catch(error) {
		return error;
	}
};

const deleteUpdate = async (id) => {
	try {
		return await Update.findByIdAndRemove(id);
	} catch(error) {
		return error;
	}
};


module.exports = {
    getUpdates,
    createUpdate,
	editUpdate,
	deleteUpdate,
};