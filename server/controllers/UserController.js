require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/UserModel");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    return res
      .status(404)
      .json({ mssg: "Username telah digunakan, pilih username lain" });
  }

  try {
    const user = await Users.create({ username, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Users.findOne({ username });
    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPassValid = await bcrypt.compare(password, existingUser.password);
    if (!isPassValid) {
      res.status(404).json({ error: "Password salah!" });
      return;
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, existingUser });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mssg: err });
  }
});

module.exports = router;
