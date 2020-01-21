const mongoose = require('mongoose');

var publicationSchema = new mongoose.Schema({
    author: { type: String, required: true },
    dateOfCreation: { type: String, required: true},
    content: { type: String, required: true},
    tags: [String], 
    files: [String],
    groupID: {type: String, required: false}
});

module.exports = mongoose.model('publications', publicationSchema)