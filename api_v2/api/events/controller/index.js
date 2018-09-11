const queries 	= require('./../query');
const User		= require('./../../users/query');

const postEvent = async (request, response) => {
	try {
		const newEvent = await queries.createEvent(request.body.data);
		response.json({ success: true, message: 'Event Created', result: newEvent });
	} catch(error) {
		console.log(error);
		return error;
	}
}

const getEvent = async (request, response) => {
	try {
		const fetchedEvent = await queries.getEvent(request.params.id);	
		response.json({ success: true, result: fetchedEvent });
	} catch(error) {
		return error;
	}
};

const putEvent = async (request, response) => {
	//if(request.body.data.OIC.includes.includes())
	
	try {
		//get old event for list of OIC..in case user tried to add themselves as OIC
		const oldEvent = await queries.getEvent(request.body.data._id); 

		if(oldEvent.OIC.includes(request.body.user)) {
			return response.json({ success: false, message:"User not Authorized" });
		}

		const updatedEvent = await queries.updateEvent(request.body.data);
		response.json({ success: true, result: updatedEvent });
	} catch(error) {
		return error;
	}
}

const getEvents = async (request, response) => {
	try {
		const events = await queries.getEvents();
		response.json({ success: true, result: events});
	} catch(error) {
		return error;
	}
};


const deleteEvent = async (request, response) => {
	try {
		await queries.deleteEvent(request.params.id);
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
