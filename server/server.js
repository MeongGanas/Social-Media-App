require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PostController = require("./controllers/PostController");
const UserController = require("./controllers/UserController");
const MiddlewareController = require("./controllers/MiddlewareController");
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/posts/:userId", PostController);
app.use("/users", UserController);

app.use("/middleware", MiddlewareController);

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
