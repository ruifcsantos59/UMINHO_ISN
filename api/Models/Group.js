const mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    photo: { type: String, required: false },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dateOfCreation: { type: String, required: true },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Publication"
        }
    ]
});

module.exports = mongoose.model('Group', groupSchema)