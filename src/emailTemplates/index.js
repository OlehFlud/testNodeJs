const { ActionEnum } = require('../constants');

module.exports.htmlTemplate = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Hello',
    templateFileName: 'confirm-email',
  },
};
