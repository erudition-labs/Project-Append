const queries = require('./../query');

const postChangelog = async (request, response) => {
    try {
		const newChangelog = await queries.createChangelog(request.body.data);
		response.json({ success: true, message: 'Changelog Created', result: newChangelog });
	} catch(error) {
		console.log(error);
		return error;
	}
};

const getChangelog = async (request, response) => {
    try {
		const fetchedChangelog  = await queries.getChangelog(request.params.id);	
		response.json({ success: true, result: fetchedChangelog });
	} catch(error) {
		return error;
	}
};

const putChangelog = async (request, response) => {
    try {
		const updatedChangelog = await queries.updateChangelog(request.body.data);
		response.json({ success: true, result: updatedChangelog });
	} catch(error) {
		return error;
	}
};


module.exports = {
	postChangelog,
	getChangelog,
	putChangelog
};
