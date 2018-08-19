const queries = require('./../query');

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
/*
const updateEvent = async (request, response) => {
	try {
		const updatedEvent = await queries.updateEvent(request.body.data);
		response.json({ success: true, result: updatedEvent });
	} catch(error) {
		return error;
	}
}
*/
module.exports = {
	postEvent,
	getEvent
};
