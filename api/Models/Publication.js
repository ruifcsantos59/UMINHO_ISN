const mongoose = require('mongoose');

var comentSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: { type: String, required: true },
    date: {type: String, required: true}
});


var publicationSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    emailOfAuthor: {type: String, required: true},
    nameOfAuthor: {type: String, required: true},
    dateOfCreation: { type: String, required: true},
    content: { type: String, required: true},
    tags: [String], 
    files: [
        {
            name: String,
            mimetype: String,
        }
    ],
    isPrivate: {type: Boolean, required: true},
    likes: Number,
    coments: [comentSchema]
});

module.exports = mongoose.model('Publication', publicationSchema);