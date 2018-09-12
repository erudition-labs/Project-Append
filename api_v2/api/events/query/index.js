const Event = require('./../model');
const User	= require('../../users/model');

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
		return await Event.findOne({ _id: id })
		.populate('OIC')
		.populate('signedUp')
		.populate('pending');
	} catch(error) {
		return error;
	}
};

const updateEvent = async (data) => {
	try {
		return await Event.findByIdAndUpdate(data._id, data, { new: true })
		.populate('OIC')
		.populate('signedUp')
		.populate('pending');
	} catch(error) {
		return error;
	}
};

const getEvents = async () => {
	try {
		return await Event.find().sort({ date: 'descending' }).limit(30)
		.populate('OIC')
		.populate('signedUp')
		.populate('pending');
	} catch(error) {
		return error;
	}
}

const deleteEvent = async (id) => {
	try {
		return await Event.findByIdAndDelete(id);	
	} catch(error) {
		return error;
	}
};

module.exports = {
	createEvent,
	getEvent,
	updateEvent,
	getEvents,
	deleteEvent
};
