var Publication = require('../Models/Publication');

module.exports.feed = (id) => {
    return Publication.find({ author: { $ne: id }, isPrivate: false, hasGroup: false})
        .populate({
            path: 'author',
            model: 'User'
        })
        .sort({dateOfCreation: -1})
        .exec();
}

module.exports.newPost = (p) => {
    var post = new Publication(p);
    return post.save();
};
