const mongoose = require('mongoose');

var comentSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: { type: String, required: true },
    date: {type: String, required: true}
});

var fileSchema = new mongoose.Schema({
    date: String,
    desc: String,
    name: String,
    mimetype: String,
    size: Number
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