const { Types } = require('mongoose');
const UserModel = require('../dataBase/models/user');

module.exports = {

    createUser: (user) => {
        const userToCreate = new UserModel(user);
        return userToCreate.save();
    },

    addActionToken: (userId, tokenObject) => UserModel.update(
        { _id: Types.ObjectId(userId) },
        {
            $push: {
                tokens: tokenObject,
            },
        },
    ),

    updateUserByParams: (params, update) => UserModel.updateOne(params, update, { new: true }),

    findUserByActionToken: (action, token) => UserModel.findOne({
        $and: [
            { 'tokens.action': action },
            { 'tokens.token': token },
        ],
    }),

    findOneByParams: (findObject) => UserModel.findOne(findObject),
};
