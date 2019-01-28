const Event = require('./../model');
const User	= require('../../users/model');
const Util	= require('../util');

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
		let event =  await Event.findOne({ _id: id })
		.populate('OIC', 		{ password: 0 })
		.populate('signedUp', 	{ password: 0 })
		.populate('pending', 	{ password: 0 })
		.populate('author', 	{ password: 0 });

		return Util.unescapeEvent(event);
	} catch(error) {
		return error;
	}
};

const updateEvent = async (data) => {
	try {
		let event = await Event.findByIdAndUpdate(data._id, data, { new: true })
		.populate('OIC', 		{ password: 0 })
		.populate('signedUp', 	{ password: 0 })
		.populate('pending', 	{ password: 0 })
		.populate('author', 	{ password: 0 });
		return Util.unescapeEvent(event);
	} catch(error) {
		return error;
	}
};

const getEvents = async () => {
	try {
		let events = await Event.find({isDeleted: {$ne: true}}).sort({ date: 'descending' }).limit(100)
		.populate('OIC', 		{ password: 0 })
		.populate('signedUp', 	{ password: 0 })
		.populate('pending', 	{ password: 0 })
		.populate('author', 	{ password: 0 });

		return Util.unescapeEventArray(events);
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
