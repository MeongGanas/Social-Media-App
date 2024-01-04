const express = require("express");
const authMiddleware = require("../middleware/Auth");
const router = express.Router();

router.get("/secure-data", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
