import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";

const router = express.Router();

// create a new category
router.post("/", protect, isAdmin, uploadImage.single("image"), createCategory);

//  GET all categories
router.get("/", getCategories);

// get single category by ID
router.get("/:id", getCategoryById);

// update a category
router.put("/:id", protect, isAdmin, uploadImage.single("image"), updateCategory);

// delete a category by ID
router.delete("/:id", protect, isAdmin, deleteCategory);

export default router;
