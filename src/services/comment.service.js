const CommentModel = require('../dataBase/models/comment');

module.exports = {

  createComment: (comment) => {
    const commentToCreate = new CommentModel(comment);
    return commentToCreate.save();
  },

  updateByParams: (params, update) => CommentModel.updateOne(params, update, { new: true }),

  removeComment: (data) => CommentModel.findOneAndDelete(data),

  findById: (id) => CommentModel.findById(id),

  findAll: () => CommentModel.find({}),

  likeComment: (userId, commentIdtoLike) =>
       CommentModel.update(
        { _id: commentIdtoLike },
        { $push: { likes: userId } }
      ),

  unlikeComment: (userId, commentIdtoUnlike) =>
    CommentModel.findByIdAndUpdate(
      { _id: commentIdtoUnlike },
      { $pull: { likes: userId } },
      { new: true }
    ),

  confirmComment: (userId, commentIdtoUnlike) =>
    CommentModel.findByIdAndUpdate(
      { _id: commentIdtoUnlike },
      { $pull: { likes: userId } },
      { new: true }
    ),
}

