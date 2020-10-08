const { ActionEnum, RequestHeadersEnum, ResponseStatusCodeEnum } = require('../../constants');
const { authService } = require('../../services');
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
    await tokenVerificator(ActionEnum.USER_AUTH, token);

    const userByToken = await authService.findUserByToken({ accessToken: token });
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
