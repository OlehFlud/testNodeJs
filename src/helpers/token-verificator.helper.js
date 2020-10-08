const { verify } = require('jsonwebtoken');
const { promisify } = require('util');
const { config } = require('../config');
const { ActionEnum } = require('../constants');
const { ResponseStatusCodeEnum } = require('../constants');
const { CustomErrors, ErrorHandler } = require('../errors');

const verifyPromise = promisify(verify);

module.exports = async (action, token) => {
  try {
    let isValid;

    switch (action) {
      case ActionEnum.USER_AUTH:
        isValid = await verifyPromise(token, config.JWT_SECRET);
        break;

      case ActionEnum.USER_REGISTER:
        isValid = await verifyPromise(token, config.JWT_CONFIRM_EMAIL_SECRET);
        break;

      case ActionEnum.FORGOT_PASSWORD:
        isValid = await verifyPromise(token, config.JWT_PASS_FORGOT_SECRET);
        break;

      default:
        throw new ErrorHandler(ResponseStatusCodeEnum.SERVER, 'wrong Action type');
    }

    return isValid;
  } catch (e) {
    throw new ErrorHandler(ResponseStatusCodeEnum.UNAUTHORIZED, CustomErrors.UNAUTHORIZED_BAD_TOKEN.message);
  }
};
