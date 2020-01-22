const mongoose = require('mongoose');

var publicationSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dateOfCreation: { type: String, required: true},
    content: { type: String, required: true},
    tags: [String], 
    files: [String],
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    likes: Number
});

module.exports = mongoose.model('Publication', publicationSchema)