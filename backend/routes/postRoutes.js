import express from "express";
const router = express.Router();
import {
  createNewPost,
  getPost,
  getAllPosts,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/new", protect, createNewPost);
router.get("/:_id", getPost);
router.get("/", getAllPosts);
export default router;
