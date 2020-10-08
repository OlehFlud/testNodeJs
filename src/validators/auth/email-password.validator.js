const Joi = require('joi');

const { ReqexpEnum } = require('../../constants');

module.exports = Joi.object({
  email: Joi.string().trim().regex(ReqexpEnum.email).required(),
  password: Joi.string().trim().regex(ReqexpEnum.password).required(),
});
