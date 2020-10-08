const router = require('express').Router();

const { authController } = require('../../controllers');
const { authMiddleware, userMiddleware, validatorsMiddleware } = require('../../middlewares');

router.post('/',
  validatorsMiddleware.emailPasswordValidatorMiddleware,
  userMiddleware.checkIsUserExistByEmailMiddleware,
  userMiddleware.checkIsUserConfirmedMiddleware,
  authController.authUser);

router.post('/logout',
  authMiddleware.CheckAccessTokenMiddleware,
  authController.logoutUser);

module.exports = router;
