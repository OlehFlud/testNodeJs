const { userService, mailService } = require('../services');
const { tokinazer, passwordHashed } = require('../helpers');
const { ErrorHandler, CustomErrors } = require('../errors');
const { ActionEnum, RequestHeadersEnum, ResponseStatusCodeEnum, UserStatusEnum } = require('../constants');

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = req.body;
      user.password = await passwordHashed(user.password);
      const { _id } = await userService.createUser(user);
      const { accessToken } = tokinazer(ActionEnum.USER_REGISTER);

      await userService.addActionToken(
        _id,
        { action: ActionEnum.USER_REGISTER, token: accessToken },
      );
      await mailService.sendEmail(user.email, ActionEnum.USER_REGISTER, { token: accessToken });

      res.sendStatus(ResponseStatusCodeEnum.CREATED);
    } catch (e) {
      res.status(ResponseStatusCodeEnum.BAD_REQUEST).json({
        error: e,
      });
    }
  },

  confirmUser: async (req, res, next) => {
    try {
      const { _id, status, tokens } = req.user;
      const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);

      if (status !== UserStatusEnum.PENDING) {
        return next(
          new ErrorHandler(
            ResponseStatusCodeEnum.BAD_REQUEST,
            CustomErrors.BAD_REQUEST_USER_ACTIVATED.message,
            CustomErrors.BAD_REQUEST_USER_ACTIVATED.code,
          ),
        );
      }

      await userService.updateUserByParams({ _id }, { status: UserStatusEnum.CONFIRMED });

      const index = tokens.findIndex(
        ({ action, token }) => token === tokenToDelete && action === ActionEnum.USER_REGISTER,
      );

      if (index !== -1) {
        tokens.splice(index, 1);
        await userService.updateUserByParams({ _id }, { tokens });
      }
      res.end();
    } catch (e) {
      res.status(ResponseStatusCodeEnum.BAD_REQUEST).json({
        error: e,
      });
    }
  },

  updateUser: async (req, res, next) => {
    const { _id } = req.params;
    const parameters = req.body;
    await userService.updateUserByParams({ _id }, parameters);
    res.sendStatus(ResponseStatusCodeEnum.OK);
  },
};
