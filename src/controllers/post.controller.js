const { postService }  = require('../services');
const { ResponseStatusCodeEnum } = require('../constants');

module.exports = {

  createPost: async (req, res) => {
    try {
      const post = req.body;
      const { _id } = req.user;
      const newPost = await postService.createPost({...post, authorId: _id});
      res.json(newPost);
    } catch (e) {
      res.status(ResponseStatusCodeEnum.BAD_REQUEST).json({
        error: e,
      });
    }
  },

  updatePost: async (req, res, next) => {
    const { _id } = req.params;
    const parameters = req.body;
    await postService.updatePost({ _id }, parameters);
    res.sendStatus(ResponseStatusCodeEnum.OK);
  },

  deletePost: async (req, res, next) => {
    const { _id } = req.params;
    await postService.removePost({ _id });
    res.sendStatus(ResponseStatusCodeEnum.NO_CONTENT);
  },

  findAllPost: async (req, res, next) => {
    await postService.findAll();
    res.sendStatus(ResponseStatusCodeEnum.OK)
  },

  likePost: async (req, res, next) => {
    const { _id } = req.user;
    const postId = req.params._id;
    await postService.likePost(_id, postId)
    res.sendStatus(ResponseStatusCodeEnum.OK)
  },

  unlikePost: async (req, res, next) => {
    const { _id } = req.user;
    const postId = req.params._id;
    await postService.unlikePost(_id, postId)
    res.sendStatus(ResponseStatusCodeEnum.OK)
  }
};
