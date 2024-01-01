const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostModel = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostModel);
