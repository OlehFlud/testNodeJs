const Joi = require('joi');
const { authValidator } = require('../../validators');
const { ErrorHandler } = require('../../errors');
const { ResponseStatusCodeEnum } = require('../../constants');

module.exports = (req, res, next) => {
  const { error } = Joi.validate(req.body, authValidator.emailPasswordValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
