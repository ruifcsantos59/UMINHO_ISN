const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    recipient: { type: String},
    messages : [{
        user: String,
        message: String
    }]
});

var friendSchema = new mongoose.Schema({
    user: String,
});

var friendRequestsSchema = new mongoose.Schema({
    user: String,
});

var userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone : { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true},
    gender: { type: String, required: true}, 
    password: { type: String, required: true },
    photo: {type: String, required: false},
    description: {type: String, required: false},
    lastAccess: {type: String, required: false},
    friendRequests: {type: [friendRequestsSchema] ,required: false}, //assim ou então com a referência para o Object ID
    friends: {type: [friendSchema], required: false}, //assim ou então com a referência para o Object ID
    messages: {type: [messageSchema], required: false},
    posts: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Publication"}], required: false}
});

module.exports = mongoose.model('User', userSchema)