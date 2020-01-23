var User = require('../Models/User');

module.exports.newUser = (u) => {
    var user = new User(u);
    return user.save();
};

module.exports.user = (email) => {
    return User.findOne({email: email}).exec();
}

