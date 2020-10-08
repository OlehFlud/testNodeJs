const jwt = require('jsonwebtoken');

const { ActionEnum, ResponseStatusCodesEnum } = require('../constants');
const { ErrorHandler } = require('../errors');
const { config } = require('../config');

module.exports = (action) => {
  let accessToken = '';
  let refreshToken = '';

  switch (action) {
    case ActionEnum.USER_AUTH:
      accessToken = jwt.sign({}, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME });
      refreshToken = jwt.sign({}, config.JWT_REFRESH_SECRET,
        { expiresIn: config.REFRESH_TOKEN_LIFETIME });
      break;

    case ActionEnum.USER_REGISTER:
      accessToken = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET,
        { expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME });
      break;

    case ActionEnum.FORGOT_PASSWORD:
      accessToken = jwt.sign({}, config.JWT_PASS_FORGOT_SECRET,
        { expiresIn: config.JWT_PASS_FORGOT_LIFETIME });
      break;

    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'wrong Action type');
  }

  return {
    accessToken,
    refreshToken,
  };
};
