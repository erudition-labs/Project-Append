const Update   = require('./../model');
const User      = require('../../users/model');

const getUpdates = async () => {
    try {
        return await Update.find().sort({ date: 'descending' }).limit(5).populate('author');
    } catch(error) {
        return error;
    }
};

module.exports = {
	getUpdates,
};