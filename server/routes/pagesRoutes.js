import express from "express";
import { saveContent, getContent } from "../controllers/pagesController.js";

const router = express.Router();

// Save or update content
router.post("/save", saveContent);

// Get content by type
router.get("/:type", getContent);

export default router;
