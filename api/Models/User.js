const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    user: { type: String, required: true},
    messages : [{
        user: String,
        message: String
    }]
});

var friendSchema = new mongoose.Schema({
    user: String,
    photo: String
});

var friendRequestSchema = new mongoose.Schema({
    user: String,
    photo: String
});

var userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone : { type: String, required: true },
    email: { type: String, required: true },
    date_of_birht: { type: String, required: true},
    gender: { type: String, required: true}, 
    password: { type: String, required: true },
    photo: {type: String, required: false},
    last_access: String,
    friends_request: [friendRequestSchema], //assim ou então um array de string apenas com o nome e depois com uma chamada à API sabemos a foto
    friends: [friendSchema], //assim ou então um array de string apenas com o nome e depois com uma chamada à API sabemos a foto
    messages: [messageSchema]
  });

module.exports = mongoose.model('users', userSchema)