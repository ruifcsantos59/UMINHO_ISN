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

module.exports.findUsers = (name) => {
    return User.find({ firstName: { $regex: name, $options: 'i' }}, {email: 1, firstName: 1, lastName: 1}).exec();
}

module.exports.updateUser = (email, body) => {
    return User.findOneAndUpdate({email: email}, body, (err, model) => {
        console.log(err);
        console.log(model);
    }).exec();
} 