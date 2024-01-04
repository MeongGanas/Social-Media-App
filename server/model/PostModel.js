const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostModel = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostModel);
