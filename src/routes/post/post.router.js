const router = require('express').Router();

const { authMiddleware } = require('../../middlewares');
const { postController } = require('../../controllers');

router.post('/post', authMiddleware.CheckAccessTokenMiddleware, postController.createPost);

router.get('/post', authMiddleware.CheckAccessTokenMiddleware, postController.findAllPost);

router.put('/post:_id', authMiddleware.CheckAccessTokenMiddleware, postController.updatePost);

router.delete('/post:_id', authMiddleware.CheckAccessTokenMiddleware, postController.deletePost);

router.post('/like:_id',authMiddleware.CheckAccessTokenMiddleware,postController.likePost);

router.post('/like:_id',authMiddleware.CheckAccessTokenMiddleware,postController.unlikePost);

module.exports = router;
