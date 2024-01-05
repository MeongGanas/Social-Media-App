const mongoose = require("mongoose");
const express = require("express");
const Posts = require("../model/PostModel");
const multer = require("multer");
const uuidv4 = require("uuid").v4;

const router = express.Router({ mergeParams: true });

// all posts
router.get("/", async (req, res) => {
  const posts = await Posts.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
});

// single posts
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const posts = await Posts.findById(id);

  res.status(200).json(posts);
});

// create posts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/:userId/create", upload.single("image"), async (req, res) => {
  const { desc } = req.body;
  const { userId } = req.params;

  try {
    const post = await Posts.create({
      author: userId,
      desc,
      image: req.file.filename,
    });
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

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const posts = await Posts.find({ author: userId });

  if (!posts) {
    return res.status(404).json({ mssg: "Posts not found" });
  }

  res.status(200).json(posts);
});

module.exports = router;
