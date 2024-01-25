import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
    },
    body: String,
    date: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
    },
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
