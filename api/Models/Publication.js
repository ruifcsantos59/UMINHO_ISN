const mongoose = require('mongoose');

var comentSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: { type: String, required: true },
    date: {type: String, required: true}
});

var fileSchema = new mongoose.Schema({
    name: String,
    mimetype: String,
})

var publicationSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dateOfCreation: { type: String, required: true},
    content: { type: String, required: true},
    tags: [String], 
    files: [fileSchema],
    likes: Number,
    coments: [comentSchema]
});

module.exports = mongoose.model('Publication', publicationSchema);