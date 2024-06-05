import express from "express";
const router = express.Router();
import {
  createNewPost,
  getPost,
  getAllPosts,
  addComment,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/new", protect, createNewPost);

router.get("/", getAllPosts);

router.route("/:_id").get(getPost).post(protect, addComment);
export default router;
