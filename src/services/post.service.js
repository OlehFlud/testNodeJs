const PostModel = require('../dataBase/models/post');

module.exports = {

  createPost: (post) => {
    const postToCreate = new PostModel(post);
    return postToCreate.save();
  },

  updateByParams: (params, update) => PostModel.updateOne(params, update, { new: true }),

  removePost: (data) => PostModel.findOneAndDelete(data),

  findById: (Id) => PostModel.findById(Id),

  findAll: () => PostModel.findAll(),

  likePost: (userId, postIdtoLike) =>
    PostModel.update(
      { _id: postIdtoLike },
      { $push: { likes: userId } }
    ),

  unlikePost: (userId, postIdtoUnlike) =>
    PostModel.findByIdAndUpdate(
      { _id: postIdtoUnlike },
      { $pull: { likes: userId } },
      { new: true }
    ),

};
