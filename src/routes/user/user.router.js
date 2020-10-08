const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware, tokenMiddleware } = require('../../middlewares');

router.post('/registration',
  userMiddleware.checkIsUserValidMiddleware,
  userMiddleware.checkIsUserEmailExistMiddleware,
  userController.createUser);

router.post('/confirm', tokenMiddleware.checkConfirmTokenMiddleware, userController.confirmUser);

module.exports = router;
