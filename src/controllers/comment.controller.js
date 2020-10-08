const { commentService }  = require('../services');
const {  ResponseStatusCodeEnum } = require('../constants');

module.exports = {
    createComment: async (req, res) => {
        try {
            const comment = req.body;
            const { _id } = req.user;
            const newComment = await commentService.createComment({ ...comment, authorId: _id});
            res.json(newComment);
        } catch (e) {
            res.status(ResponseStatusCodeEnum.BAD_REQUEST).json({
                error: e,
            });
        }
    },

    updateComment: async (req, res, next) => {
        const { _id } = req.params;
        const parameters = req.body;
        await commentService.updateByParams({ _id }, parameters);
        res.sendStatus(ResponseStatusCodeEnum.OK);
    },

    deleteComment: async (req, res, next) => {
        const { _id } = req.params;
        await commentService.removeComment({ _id });
        res.sendStatus(ResponseStatusCodeEnum.NO_CONTENT);
    },

    findAllComment: async (req, res, next) => {
        await commentService.findAll();
        res.sendStatus(ResponseStatusCodeEnum.OK)
    },

    likeComment: async (req, res, next) => {
        const { _id } = req.user;
        const commentId = req.params._id;
        await commentService.likeComment(_id, commentId)
        res.sendStatus(ResponseStatusCodeEnum.OK)
    },

    unlikeComment: async (req, res, next) => {
        const { _id } = req.user;
        const commentId = req.params._id;
        await commentService.unlikeComment(_id, commentId)
        res.sendStatus(ResponseStatusCodeEnum.OK)
    },
};
