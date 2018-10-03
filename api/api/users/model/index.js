const mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;
const uniqueValidator 	= require('mongoose-unique-validator');

const userModel = new Schema({
	firstName			: { type: String, required: true },
	lastName			: { type: String, required: true },
	fullName			: { type: String, required: true },
	email				: { type: String, index: true, unique: true, required: true },
	rank				: { type: String, required: false },
	flight 				: { type: String, required: true },
	team 				: { type: String, required: false },
	password			: { type: String, required: true },
	phone				: { type: String, required: true},
	role				: { type: String, required: true },
	isChangelogViewed	: { type: Boolean, default: false },
	resetPasswordToken		: String,
	resetPasswordExpires	: Date,
	events		: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'event',
		required: false
	}],
}).plugin(uniqueValidator);



const tempUserModel = new Schema({
	firstName			: { type: String, required: true },
	lastName			: { type: String, required: true },
	fullName			: { type: String, required: true },
	email				: { type: String, index: true, unique: true, required: true },
	rank				: { type: String, required: false },
	flight 				: { type: String, required: true },
	team 				: { type: String, required: false },
	password			: { type: String, required: true },
	phone				: { type: String, required: true },
	role				: { type: String, required: true },
	isChangelogViewed	: { type: Boolean, default: false },
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	events		: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'event',
		required: false
	}],
	GENERATED_VERIFYING_URL : { type: String }
}).plugin(uniqueValidator);


module.exports.user 	= mongoose.model('user', userModel);
module.exports.tmpUser 	= mongoose.model('tempUser', tempUserModel);
module.exports.UserSchema = userModel;

