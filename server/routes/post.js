const express = require("express");
const router = express.Router({ mergeParams: true });

const multer = require("multer");
const {
  getAllPost,
  getUserPost,
  likePost,
  unlikePost,
  commentPost,
  createPost,
  deletePost,
  updatePost,
  getSinglePost,
} = require("../controllers/PostController");
const uuidv4 = require("uuid").v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllPost);
router.get("/post/:id", getSinglePost);
router.get("/:userId/", getUserPost);
router.get("/:userId/like/:postId", likePost);
router.get("/:userId/unlike/:postId", unlikePost);

router.post("/:userId/create", upload.single("image"), createPost);
router.post("/comment/:postId", commentPost);

router.delete("/:userId/:id", deletePost);
router.patch("/:userId/:id", updatePost);

module.exports = router;
