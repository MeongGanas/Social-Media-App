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
    author: { type: String, ref: "User" },
    author_id: { type: Schema.Types.ObjectId, ref: "User" },
    likes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostModel);
