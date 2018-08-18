const Event = require('./../model');

const createEvent = async (eventData) => {
	try {
		const newEvent = new Event(eventData);
		return await newEvent.save();
	} catch(error) {
		console.log(error);
		return error;
	}
}

module.exports = {
	createEvent
};
