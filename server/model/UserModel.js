const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    profile: { type: Buffer, required: false },
  },
  { timestamps: true }
);

userModel.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("Users", userModel);
