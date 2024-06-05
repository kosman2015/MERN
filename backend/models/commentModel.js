import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },

  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
