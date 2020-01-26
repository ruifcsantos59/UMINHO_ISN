var User = require('../Models/User');

module.exports.newUser = u => {
	var user = new User(u);
	return user.save();
};

module.exports.user = email => {
	return User.findOne({ email: email })
		.populate({
			path: 'posts',
			model: 'Publication'
		})
		.populate({
			path: 'groups',
			model: 'Group'
		})
		.populate({
			path: 'friends',
			model: 'User'
		})
		.exec();
};

module.exports.userLogin = email => {
	return User.findOne({ email: email }, { email: 1, password: 1 }).exec();
};

module.exports.searchUsers = name => {
	return User.find(
		{ firstName: { $regex: name, $options: 'i' } },
		{ _id: 1, email: 1, firstName: 1, lastName: 1 }
	).exec();
};

module.exports.updateUser = (email, body) => {
	return User.findOneAndUpdate({ email: email }, body, (err, model) => {
		console.log(err);
		console.log(model);
	}).exec();
};

module.exports.addPost = (id, postid) => {
	return User.findOneAndUpdate(
		{ _id: id },
		{ $push: { posts: postid } }
	).exec();
};

module.exports.addGroup = (id, groupid) => {
	return User.findOneAndUpdate(
		{ _id: id },
		{ $push: { groups: groupid } }
	).exec();
};

module.exports.myGroups = id => {
	return User.findOne({ _id: id }, { groups: 1 })
		.populate({
			path: 'groups',
			model: 'Group'
		})
		.exec();
};

module.exports.feed = email => {
	return User.findOne({ email: email })
		.populate({
			path: 'friends',
			model: 'User',
			populate: {
                path: 'posts',
                model: 'Publication'
			}
		})
		.exec();
};

module.exports.addFriend = (email, friendID) => {
	return User.findOneAndUpdate(
		{ email: email },
		{ $push: { friends: friendID } }
	).exec();
};
