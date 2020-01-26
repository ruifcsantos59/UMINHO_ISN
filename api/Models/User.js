const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	recipient: { type: String },
	messages: [
		{
			user: String,
			message: String
		}
	]
});

var userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	dateOfBirth: { type: String, required: true },
	gender: { type: String, required: true },
	password: { type: String, required: true },
	photo: { type: String, required: false },
	description: { type: String, required: false },
	lastAccess: { type: String, required: false },
	friendRequests: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		required: false
	},
	friends: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		required: false
	},
	messages: { type: [messageSchema], required: false },
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Publication'
		}
	],
	groups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Group'
		}
	]
});

module.exports = mongoose.model('User', userSchema);
