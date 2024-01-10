const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
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
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      { comment: String, userId: { type: Schema.Types.ObjectId, ref: "User" } },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostModel);
