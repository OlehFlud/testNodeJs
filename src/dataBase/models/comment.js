const mongoose = require('mongoose');
const { TableNames } = require('../../constants');

const commentSchema = new mongoose.Schema({

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TableNames.EDITORS,
        required: false,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TableNames.POST,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
     likes: {
        required: false,
        default: []
    },
}, {
    timestamp: true,
});

module.exports = mongoose.model(TableNames.POST, commentSchema);
