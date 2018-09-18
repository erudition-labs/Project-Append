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
		return await Update.findByIdAndUpdate(id, update, { new: true });
	} catch(error) {
		return error;
	}
};


module.exports = {
    getUpdates,
    createUpdate,
    editUpdate
};