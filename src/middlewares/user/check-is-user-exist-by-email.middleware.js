const { userService } = require('../../services');
const { ErrorHandler, CustomErrors } = require('../../errors');
const { ResponseStatusCodeEnum } = require('../../constants');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const userByEmail = await userService.findOneByParams({email});

  if (!userByEmail) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      CustomErrors.NOT_FOUND.message,
    ));
  }

  req.user = userByEmail;
  next();
};
