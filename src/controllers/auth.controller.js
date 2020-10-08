const { authService } = require('../services');
const { tokinazer, comparePassword } = require('../helpers');
const { CustomErrors, ErrorHandler } = require('../errors');
const { ActionEnum, ResponseStatusCodeEnum, RequestHeadersEnum } = require('../constants');

module.exports = {

    authUser: async (req, res, next) => {
        try {
            const { _id, password } = req.user;
            const authInfo = req.body;
            const isPasswordEquals = await comparePassword(authInfo.password, password);

            if (!isPasswordEquals) {
                return next(
                    new ErrorHandler(
                        ResponseStatusCodeEnum.NOT_FOUND,
                        CustomErrors.NOT_FOUND.message,
                    ),
                );
            }

            const { accessToken, refreshToken } = tokinazer(ActionEnum.USER_AUTH);

            await authService.createTokenPair({
                accessToken: accessToken,
                refreshToken: refreshToken,
                userId: _id,
            });
            res.json({ accessToken, refreshToken });
        } catch (e) {
            return next(e)
        }
    },

    logoutUser: async (req, res, next) => {
        const accessToken = req.get(RequestHeadersEnum.AUTHORIZATION);
        await authService.removeToken({ accessToken });
        res.sendStatus(ResponseStatusCodeEnum.NO_CONTENT);
    },
};
