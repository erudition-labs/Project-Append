const queries 	= require('./../query');
const User		= require('./../../users/query');
const mongoose 	= require('mongoose');

const getUpdates = async(request, response) => {
    try {
        const updates = await queries.getUpdates();
        console.log(updates[0].date);
        
        response.json({ success: true, result: updates });
    } catch(error) {
        return error;
    }
}

module.exports = {
	getUpdates,
};