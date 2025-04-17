import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
} from "../controllers/categoryController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";

const router = express.Router();

// create a new category
router.post("/", protect, isAdmin, uploadImage.single("categoryImage"), createCategory);

//  GET all categories
router.get("/", getCategories);

// get single category by ID
router.get("/:id", getCategoryById);

// toggle category status
router.patch("/:id/toggle-status", toggleCategoryStatus);

// update a category
router.put("/:id", protect, isAdmin, uploadImage.single("categoryImage"), updateCategory);

// delete a category by ID
router.delete("/:id", protect, isAdmin, deleteCategory);

export default router;
