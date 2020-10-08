const router = require('express').Router();

const { authMiddleware } = require('../../middlewares');
const { commentController } = require('../../controllers');

router.post('/comment', authMiddleware.CheckAccessTokenMiddleware, commentController.createComment);

router.put('/comment:_id', authMiddleware.CheckAccessTokenMiddleware, commentController.updateComment);

router.delete('/comment:_id', authMiddleware.CheckAccessTokenMiddleware, commentController.deleteComment);

router.get('/comment', authMiddleware.CheckAccessTokenMiddleware, commentController.findAllComment);

router.post('/like:_id',authMiddleware.CheckAccessTokenMiddleware,commentController.likeComment);

router.post('/unlike:_id',authMiddleware.CheckAccessTokenMiddleware,commentController.unlikeComment);

module.exports = router;
