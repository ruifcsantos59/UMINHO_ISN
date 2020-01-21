const mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    photo: { type: String, required: true },
    createdBy: { type: String, required: true },
    dateOfCreation: { type: String, required: true },
    members: [String] //PARA JÁ FICA DE STRING
});

module.exports = mongoose.model('groups', groupSchema)