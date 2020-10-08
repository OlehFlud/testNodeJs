const Joi = require('joi');

const { ReqexpEnum } = require('../../constants');

module.exports = Joi.object({
  name: Joi.string().trim().min(2).max(25).required(),
  surname: Joi.string().trim().min(2).max(50).required(),
  password: Joi.string().trim().regex(ReqexpEnum.password).required(),
  email: Joi.string().trim().regex(ReqexpEnum.email).required(),
});
