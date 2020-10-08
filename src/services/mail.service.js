const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { ResponseStatusCodeEnum } = require('../constants');
const { htmlTemplate } = require('../emailTemplates');
const { config } = require('../config');
const { ErrorHandler } = require('../errors');

if (
  !config.FRONTEND_URL
  || !config.ROOT_EMAIL_SERVICE
  || !config.ROOT_EMAIL
  || !config.ROOT_EMAIL_PASSWORD
) {
  throw new Error('email credentials are not defined!');
}
const contextExtention = {
  frontendUrl: config.FRONTEND_URL,
};

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD,
  },
});

const emailTemplates = new EmailTemplates({
  message: {},
  views: {
    root: path.resolve(__dirname, '../', 'emailTemplates'),
  },
});

class MailService {

  async sendEmail(email, action, context) {
    const templateInfo = htmlTemplate[action];

    if (!templateInfo) {
      throw new ErrorHandler(ResponseStatusCodeEnum.SERVER, 'template not found');
    }
    Object.assign(context, contextExtention);

    const html = await emailTemplates.render(templateInfo.templateFileName, context);

    await transporter.sendMail({
      from: `No reply <${config.ROOT_EMAIL}> `,
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}
module.exports = new MailService();
