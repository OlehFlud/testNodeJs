const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { TableNames } = require('../../constants');

const AccessTokenSchema = new mongoose.Schema({
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: TableNames.EDITORS,
    },
}
, {
  timestamps: true,
});
module.exports = mongoose.model(TableNames.ACCESS_TOKEN, AccessTokenSchema);
