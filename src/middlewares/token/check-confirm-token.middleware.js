const { ActionEnum, RequestHeadersEnum, ResponseStatusCodeEnum } = require('../../constants');
const { CustomErrors, ErrorHandler } = require('../../errors');
const { userService } = require('../../services');
const { tokenVerificator } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);
    if (!token) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.BAD_REQUEST,
        CustomErrors.BAD_REQUEST_NO_TOKEN.message,
      ));
    }
    const b = await tokenVerificator(ActionEnum.USER_REGISTER, token);
    console.log(b);

    const userByToken = await userService.findUserByActionToken(ActionEnum.USER_REGISTER, token);

    if (!userByToken) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.NOT_FOUND,
        CustomErrors.NOT_FOUND.message,
      ));
    }

    req.user = userByToken;
    next();
  } catch (e) {
    next(e);
  }
};
