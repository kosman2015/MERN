import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @desc create a new post
// route POST /api/new
// @access Private
const createNewPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const author = {
    id: req.user._id,
    name: req.user.name,
  };
  const post = await Post.create({
    title,
    body,
    author,
  });

  if (post) {
    res.status(201).json({
      _id: post._id,
      title: post.title,
      author: post.author.name,
      feedback: post.feedback,
    });
  } else {
    res.status(400);
    throw new Error("Post was not created");
  }
});
// @desc Get post
// route GET /api/posts/id
// @access Public
const getPost = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

export { createNewPost, getPost };
