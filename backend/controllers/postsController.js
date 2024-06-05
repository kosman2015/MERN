import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

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

  if (post && post.title.length > 0 && post.body.length > 0) {
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
  const post = await Post.findById(req.params);
  const comments = await Comment.find({ post: post._id });
  if (post) {
    res.status(200).json({
      post,
      comments,
    });
  } else {
    res.status(404);
    throw new Error("Post does not exist");
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
});

const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params);
  const user = await User.findById(req.user._id);
  const { comment } = req.body;
  const author = {
    id: req.user._id,
    name: req.user.name,
  };
  if (user) {
    if (post) {
      const newComment = await Comment.create({
        body: comment,
        author,
        post,
      });

      res.status(201).json({
        body: newComment.body,
        author: newComment.author.name,
      });
    } else {
      res.status(404);
      throw new Error("Post does not exist");
    }
  } else {
    res.status(404);
    throw new Error("Must be logged in to comment");
  }
});

export { createNewPost, getPost, getAllPosts, addComment };
