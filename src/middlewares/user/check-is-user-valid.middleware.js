const Joi = require('joi');

const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
  const { error } = Joi.validate(req.body, userValidator.newUserValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();
};
