const mongoose = require("mongoose");
const Posts = require("../model/PostModel");
const Users = require("../model/UserModel");

// all posts
const getAllPost = async (req, res) => {
  const posts = await Posts.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// single posts
const getSinglePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const posts = await Posts.findById(id);

  res.status(200).json(posts);
};

// create posts
const createPost = async (req, res) => {
  const { desc, title } = req.body;
  const { userId } = req.params;
  const user = await Users.findById(userId);

  try {
    const post = await Posts.create({
      title,
      author: user.username,
      author_id: userId,
      desc,
      image: req.file.filename,
      likes: 0,
      comments: [],
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// delete posts
const deletePost = async (req, res) => {
  const { id, userId } = req.params;

  if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(userId)) {
    return res.status(404).json({ mssg: "Invalid ID" });
  }

  const post = await Posts.findOneAndDelete({ _id: id, author: userId });

  if (!post) {
    return res.status(404).json({ mssg: "No such post" });
  }

  res.status(200).json(post);
};

// update posts
const updatePost = async (req, res) => {
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
};

const getUserPost = async (req, res) => {
  const { userId } = req.params;

  const posts = await Posts.find({ author_id: userId });

  if (!posts) {
    return res.status(404).json({ mssg: "Posts not found" });
  }

  res.status(200).json(posts);
};

const likePost = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const like = await Posts.findByIdAndUpdate(postId, {
      $inc: { likes: 1 },
      $addToSet: { likedBy: userId },
    });

    if (!like) {
      res.status(401).json({ error: "error" });
    }

    res.status(200).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unlikePost = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const like = await Posts.findByIdAndUpdate(
      postId,
      {
        $inc: { likes: -1 },
        $pull: { likedBy: userId },
      },
      { new: true }
    );

    if (!like) {
      res.status(401).json({ error: "error" });
    }

    res.status(200).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const commentPost = async (req, res) => {
  const { postId } = req.params;
  const data = req.body;

  const post = await Posts.findByIdAndUpdate(postId, {
    $addToSet: { comments: data },
  });

  if (post) {
    res.status(200).json(post);
  }
};

module.exports = {
  getAllPost,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getUserPost,
  commentPost,
  likePost,
  unlikePost,
};
