module.exports = {
  PORT: process.env.PORT || 5001,
  HOST: process.env.PORT || 'http://localhost',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000',

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',

  JWT_SECRET: process.env.JWT_SECRET || 'uf7e^WaiUGFSA7fd8&^dadh',
  JWT_SECRET_ADMIN: process.env.JWT_SECRET_ADMIN || 'uf7e^WaiUGFSA7fd8&^dadhADMIN',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '3fhfsdjfkf$$uIEFSHFKdf',
  JWT_REFRESH_SECRET_ADMIN: process.env.JWT_REFRESH_SECRET_ADMIN || '3fhfsdjfkf$$uIEFSHFKdfADMIN',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

  JWT_CONFIRM_EMAIL_SECRET: process.env.JWT_CONFIRM_EMAIL_SECRET || 'd%^&fsdnFFkmsdkfHJFAJa',
  JWT_CONFIRM_EMAIL_LIFETIME: process.env.JWT_CONFIRM_EMAIL_LIFETIME || '24h',

  JWT_PASS_FORGOT_SECRET: process.env.JWT_PASS_FORGOT_SECRET || '4234&&34refFSDJNK7sdf$%^',
  JWT_PASS_FORGOT_LIFETIME: process.env.JWT_PASS_FORGOT_LIFETIME || '24h',


  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/testDb',

  ROOT_EMAIL: process.env.ROOT_EMAIL || 'test',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'test',
  ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'mail',
};
