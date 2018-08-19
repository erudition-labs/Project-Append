const Event = require('./../model');

const createEvent = async (eventData) => {
	try {
		const newEvent = new Event(eventData);
		return await newEvent.save();
	} catch(error) {
		console.log(error);
		return error;
	}
};
/*
const getEvent = async (owner, id) => {
	query = {
		_id: id
	};

	if(owner !== 'admin') {
		query.OIC = owner;
	}

	try {
		return await Event.findOne(query);
	} catch(error) {
		return error;
	}
};
*/

const getEvent = async (id) => {
	try {
		return await Event.findOne({ _id: id });
	} catch(error) {
		return error;
	}
};

const updateEvent = async (id, data) => {
	try {
		const tmp =  await Event.findByIdAndUpdate(data._id, data, { new: true });
		console.log(tmp);
		return tmp;
	} catch(error) {
		return error;
	}
};


module.exports = {
	createEvent,
	getEvent,
	updateEvent
};
