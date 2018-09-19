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

const editUpdate = async (request, response) => {
	try {
    
		const updateId = request.body.data._id;
        const updateData = request.body.data;

		const edittedUpdate = await queries.editUpdate(updateId, updateData);
		response.json({ success: true, message: 'Successfully edited', result: edittedUpdate });
	} catch(error) {
		return error;
	}
};

const deleteUpdate = async (request, response) => {
	try {
        const updateId = request.params.id;
		const deletedUpdate = await queries.deleteUpdate(updateId);
		response.json({success: true, message: 'Update deleted', result: deletedUpdate});
	} catch(error) {
		return error;
	}
}

module.exports = {
    getUpdates,
    createUpdate,
    editUpdate,
    deleteUpdate,
};