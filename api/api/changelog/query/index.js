const Changelog = require('./../model');

const createChangelog = async (changelogData) => {
	try {
		const newchangelog = new Changelog(changelogData);
		return await newchangelog.save();
	} catch(error) {
		console.log(error);
		return error;
	}
};

const getChangelog = async (id) => {
	try {
		return await Changelog.findOne();
	} catch(error) {
		return error;
	}
};

const updateChangelog = async (data) => {
	try {
		return await Changelog.findByIdAndUpdate(data._id, data, { new: true })
	} catch(error) {
		return error;
	}
};

module.exports = {
	createChangelog,
	getChangelog,
	updateChangelog,
};
