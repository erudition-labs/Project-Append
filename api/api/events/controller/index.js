const queries 	= require('./../query');
const User		= require('./../../users/query');
const mongoose 	= require('mongoose');
const util		= require('../util');
//const io 		= require('socket.io');

const postEvent = async (request, response) => {
	try {
		const newEvent = await queries.createEvent(request.body.data);

		if(newEvent.errors) throw new Error('newEvent.errors');
		var socketio = request.app.get('socketio');
		socketio.sockets.emit('Data Sync', 'Data Sync');
		response.json({ success: true, message: 'Event Created', result: newEvent });
	} catch(error) {
		response.json({ success: false, message: 'Failed to Create Event' });
		//return error;
	}
};

const getEvent = async (request, response) => {
	try {
		const fetchedEvent = await queries.getEvent(request.params.id);	
		response.json({ success: true, result: fetchedEvent });
	} catch(error) {
		//return error;
	}
};

const putEvent = async (request, response) => {
	
	try {
		//get old event for list of OIC..in case user tried to add themselves as OIC
		const oldEvent = await queries.getEvent(request.body.data._id);
		const submitter = await User.getUserById(request.body.user);

		if(request.body.signup && submitter) {
			const updatedEvent = await queries.updateEvent(request.body.data);
			return response.json({ success: true, result: updatedEvent });		
		//	response.end();	
		}

	/*	if(oldEvent.OIC.indexOf(request.body.user) === -1 &&
			submitter.role !== 'admin') 
		{
			return response.json({ success: false, message:"User not Authorized" });
		}*/
		const updatedEvent = await queries.updateEvent(request.body.data);
		var socketio = request.app.get('socketio');
		socketio.sockets.emit('Data Sync', 'Data Sync');
		//io.broadcast.emit('broadcast', clients);

		response.json({ success: true, result: updatedEvent, message: 'Update Successful' });	
		//return response.json({ success: false, message:"User not Authorized" });

		//const updatedEvent = await queries.updateEvent(request.body.data);
		//response.json({ success: true, result: updatedEvent });
	} catch(error) {
		console.log(error);
		response.json({ success: false, message: 'Update Unsuccessful' });
		//return error;
	}
}

const getEvents = async (request, response) => {
	try {
		const events = await queries.getEvents();
		response.json({ success: true, result: events });
	} catch(error) {
		response.json({success: false, error: error, message: "Unable to get Events"});
		//return error;
	}
};


const deleteEvent = async (request, response) => {
	try {
		await queries.deleteEvent(request.params.id);
		var socketio = request.app.get('socketio');
		socketio.sockets.emit('Data Sync', 'Data Sync');
		response.json({ success: true, message: "Event Deleted" });
	} catch(error) {
		return error;
	}
};

module.exports = {
	postEvent,
	getEvent,
	putEvent,
	getEvents,
	deleteEvent,
	putEvent
};
