const mongoose 	= require('mongoose');
const Schema	= mongoose.Schema;

const eventModel = new Schema({
	name					: { type: String, required: true  },
	isVerificationRequired	: { type: Boolean, required: true, default: true },
	isVerified				: { type: Boolean, required: true, default: false },
	isClosed				: { type: Boolean, required: true, default: false },
	isDeleted 				: { type: Boolean, required: true, default: false },
	summary					: { type: String, required: false },
	spots					: { type: Number, required: false },
	date					: [{ type: Date, required: false }],
	OIC		: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: false
	}],
	signedUp : [{
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: false
	}],
	pending : [{
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: false
	}],
	author	: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	additionalDetails : { type: String, required: false }
});

module.exports = mongoose.model('event', eventModel);
