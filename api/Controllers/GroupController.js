var Group = require('../Models/Group');

module.exports.groups = () => {
    return Group.find({}, {name: 1, description: 1}).exec();
}

module.exports.addPost = (id, postID) => {
    return Group.findOneAndUpdate({_id: id},{ $push: { posts: postID } }).exec();
}

module.exports.consultGroup = id => {
    return Group.find({_id: id})
    .populate({
        path: 'createdBy',
        model: 'User',
        select: 'firstName , lastName' 
    }).exec();
}

module.exports.newGroup = (g) => {
    var group = new Group(g);
    return group.save();
};
