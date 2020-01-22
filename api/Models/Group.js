const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication"
})

var groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    photo: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    dateOfCreation: { type: String, required: true },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    posts: [postSchema]
});

module.exports = mongoose.model('Group', groupSchema)