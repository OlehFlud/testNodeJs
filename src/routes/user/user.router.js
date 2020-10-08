const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware, tokenMiddleware, authMiddleware } = require('../../middlewares');

router.post('/registration',
  userMiddleware.checkIsUserValidMiddleware,
  userMiddleware.checkIsUserEmailExistMiddleware,
  userController.createUser);

router.post('/confirm', tokenMiddleware.checkConfirmTokenMiddleware, userController.confirmUser);

router.put('/:_id', authMiddleware.CheckAccessTokenMiddleware, userController.updateUser);

module.exports = router;
