const mongoose = require('mongoose');
const { TableNames, PostStatusEnum } = require('../../constants');

const postSchema = new mongoose.Schema({

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TableNames.EDITORS,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    likes: {
        type: Array,
        required: false,
        default: []
    },
    status: {
        type: String,
        required: true,
        default: PostStatusEnum.PENDING,
    },
}, {
    timestamp: true,
});

module.exports = mongoose.model(TableNames.COMMENT, postSchema);
