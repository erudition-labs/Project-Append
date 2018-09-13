const Update   = require('./../model');
const User      = require('../../users/model');

const getUpdates = async () => {
    try {
        return await Update.find().sort({ date: 'ascending' }).limit(5).populate('author');
    } catch(error) {
        return error;
    }
};

module.exports = {
	getUpdates,
};