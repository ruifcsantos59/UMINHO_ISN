var Group = require('../Models/Group');

module.exports.groups = () => {
    return Group.find({}, {name: 1, description: 1}).exec();
}

module.exports.newGroup = (g) => {
    var group = new Group(g);
    return group.save();
};
