var Group = require('../Models/Group');

module.exports.groups = () => {
	return Group.find({isPrivate: false}, { name: 1, description: 1 }).exec();
};

module.exports.addPost = (id, postID) => {
	return Group.findOneAndUpdate(
		{ _id: id },
		{ $push: { posts: postID } }
	).exec();
};

module.exports.addMember = (id, memberID) => {
    return Group.findOneAndUpdate(
        {_id: id},
        {$push: {members: memberID}}
    ).exec();
}

module.exports.consultGroup = id => {
	return Group.findOne({ _id: id })
		.populate({
			path: 'createdBy',
			model: 'User',
			select: 'firstName , lastName'
		})
		.populate({
			path: 'posts',
			model: 'Publication'
		})
		.exec();
};

module.exports.newGroup = g => {
	var group = new Group(g);
	return group.save();
};
