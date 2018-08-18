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

module.exports = {
	postEvent
};
