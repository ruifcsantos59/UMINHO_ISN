var Publication = require('../Models/Publication');

module.exports.feed = (id) => {
    return Publication.find({ author: { $ne: id }})
        .populate({
            path: 'author',
            model: 'User'
        })
        .exec();
}



module.exports.newPost = (p) => {
    var post = new Publication(p);
    return post.save();
};
