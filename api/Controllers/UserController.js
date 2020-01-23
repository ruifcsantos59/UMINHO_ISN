var User = require('../Models/User');

module.exports.newUser = (u) => {
    var user = new User(u);
    return user.save();
};

module.exports.user = (email) => {
    return User.findOne({email: email}).exec();
}

module.exports.userLogin = (email) => {
    return User.findOne({email: email}, {email: 1, password: 1}).exec();
}


