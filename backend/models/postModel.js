import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    body: String,
    date: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      likes: Number,
      dislikes: Number,
    },
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
