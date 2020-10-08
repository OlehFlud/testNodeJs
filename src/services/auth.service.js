const AccessTokenModel = require('../dataBase/models/access-token');

module.exports = {

    createTokenPair: (tokenObject) => {
        const tokenToCreate = new AccessTokenModel(tokenObject);
        return tokenToCreate.save();
    },

    findUserByToken: async (findObject) => {
        const tokenAndUser = await AccessTokenModel
            .findOne(findObject)
            .populate('userId')
            .select({ userId: 1, _id: 0 });
        return tokenAndUser.userId.toJSON();
    },

    removeToken: (removeObject) => AccessTokenModel.findOneAndDelete(removeObject),
};
