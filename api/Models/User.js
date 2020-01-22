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
});

var friendRequestSchema = new mongoose.Schema({
    user: String,
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
    description: {type: String, required: false},
    last_access: String,
    friends_request: [friendRequestSchema], //assim ou então com a referência para o Object ID
    friends: [friendSchema], //assim ou então com a referência para o Object ID
    messages: [messageSchema],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Publication"
        }
    ]
  });

module.exports = mongoose.model('User', userSchema)