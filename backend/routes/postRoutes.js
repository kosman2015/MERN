import express from "express";
const router = express.Router();
import { createNewPost } from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/new", protect, createNewPost);

export default router;
