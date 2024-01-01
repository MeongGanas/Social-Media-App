const mongoose = require("mongoose");
const express = require("express");
const Posts = require("../model/PostModel");

const router = express.Router();

// all posts
router.get("/:userId", async (req, res) => {
  const posts = await Posts.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
});

// single posts
router.get("/:userId/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const posts = await Posts.findById(id);

  res.status(200).json(posts);
});

// create posts
router.post("/:userId", async (req, res) => {
  const { content, image } = req.body;
  const { userId } = req.params;

  try {
    const post = await Posts.create({ author: userId, content, image });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// delete posts
router.delete("/:userId/:id", async (req, res) => {
  const { id, userId } = req.params;

  if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(userId)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const post = await Posts.findOneAndDelete({ _id: id, author: userId });

  if (!post) {
    return res.status(404).json({ mssg: "No such post" });
  }

  res.status(200).json(post);
});

// update posts
router.patch("/:userId/:id", async (req, res) => {
  const { id, userId } = req.params;

  if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(userId)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const post = await Posts.findOneAndUpdate(
    { _id: id, author: userId },
    { ...req.body }
  );

  if (!post) {
    return res.status(404).json({ mssg: "No such post" });
  }

  res.status(200).json(post);
});

module.exports = router;