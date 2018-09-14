const queries 	= require('./../query');
const User		= require('./../../users/query');
const mongoose 	= require('mongoose');

const getUpdates = async(request, response) => {
    try {
        const updates = await queries.getUpdates();
        response.json({ success: true, result: updates });
    } catch(error) {
        return error;
    }
};

const createUpdate = async(request, response) => {
    try { 
        const newUpdate = await queries.createUpdate(request.body.data);
        response.json({ success: true, message: 'Update Created', result: newUpdate });
    } catch (error) {
        return error;
    }
}

module.exports = {
    getUpdates,
    createUpdate,
};