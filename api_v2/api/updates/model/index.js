const mongoose = require('mongoose');
const Scheme = mongoose.Scheme;

const updateModel = new Scheme({
    title       : { type: String, required: true },
    content     : { type: String, required: true },
    author      : { type: mongoose.Scheme.Types.ObjectId, ref: 'user', required: true },
    date        : { type: Date, required: true }
});

module.exports = mongoose.model('update', updateModel);