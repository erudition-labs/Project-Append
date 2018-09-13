const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateModel = new Schema({
    title       : { type: String, required: true },
    content     : { type: String, required: true },
    author      : { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    date        : { type: Date, required: true }
});

module.exports = mongoose.model('update', updateModel);