var Publication = require('../Models/Publication');

module.exports.newPost = (p) => {
    var post = new Publication(p);
    return post.save();
};
