const { ErrorHandler, CustomErrors } = require('../../errors');
const { ResponseStatusCodeEnum, UserStatusEnum } = require('../../constants');

module.exports = async (req, res, next) => {
  const { status } = req.user;

  if (status !== UserStatusEnum.CONFIRMED) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.FORBIDDEN,
      CustomErrors.FORBIDDEN_USER_NOT_CONFIRMED.message,
      CustomErrors.FORBIDDEN_USER_NOT_CONFIRMED.code,
    ));
  }

  next();
};
