const mongoose = require("mongoose");
const express = require("express");
const Posts = require("../model/PostModel");

const router = express.Router();

// all posts
router.get("/", async (req, res) => {
  const posts = await Posts.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
});

// single posts
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const posts = await Posts.findById(id);

  res.status(200).json(posts);
});

// create posts
router.post("/", async (req, res) => {
  const { desc, image } = req.body;

  try {
    const post = await Posts.create({ desc, image });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// delete posts
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const post = await Posts.findByIdAndDelete({ _id: id });
  res.status(200).json(post);
});

// update posts
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const post = await Posts.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!post) {
    return res.status(404).json({ mssg: "No such post" });
  }

  res.status(200).json(post);
});

module.exports = router;
