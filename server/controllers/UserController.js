const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../model/UserModel");

const router = express.Router();

router.get("/create", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    return res
      .status(404)
      .json({ mssg: "Username telah digunakan, pilih username lain" });
  }

  bcrypt.hash(password, 8, async (err, hash) => {
    if (err) {
      return res.status(404).json({ mssg: "Terjadi kesalahan saat hash" });
    }
    const newPass = hash;
    const user = await Users.create({ username, password: newPass });
    res.status(200).json(user);
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await Users.findOne({ username });

  if (!existingUser) {
    return res.status(404).json({ mssg: "User not found" });
  }

  bcrypt.compare(password, existingUser.password, (err, result) => {
    if (err) {
      return res
        .status(404)
        .json({ mssg: "Terjadi kesalahan saat membandingkan password." });
    }

    if (result) {
      return res.status(200).json({ mssg: "Login berhasil!" });
    } else {
      return res.status(404).json({ mssg: "Password tidak valid." });
    }
  });
});

module.exports = router;
