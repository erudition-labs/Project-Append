const mongoose 	= require('mongoose');
const Schema	= mongoose.Schema;

const eventModel = new Schema({
	name					: { type: String, required: true  },
	isVerificationRequired	: { type: Boolean, required: true },
	isVerified				: { type: Boolean, required: true },
	startDate				: { type: Date, required: false },
	endDate					: { type: Date, required false },
	OIC		: {
		type: Schema.Types.ObjectsId,
		ref: 'User',
		required: false
	}
});

module.exports = mongoose.model('event', eventModel);
