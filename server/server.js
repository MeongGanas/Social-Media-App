require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const UserController = require("./controllers/UserController");
const MiddlewareController = require("./controllers/MiddlewareController");
const path = require("path");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/posts", postRoutes);
app.use("/users", UserController);

app.use("/middleware", MiddlewareController);

app.get("/image/:name", (req, res) => {
  try {
    const { name } = req.params;
    const imagePath = path.join(__dirname, "/uploads/posts", name);
    res.sendFile(imagePath);
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and Listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
