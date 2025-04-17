import express from "express";
import {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    toggleSubCategoryStatus
} from "../controllers/subCategoryController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create a new subcategory
router.post("/", protect, isAdmin, createSubCategory);

// get all subcategories
router.get("/", getAllSubCategories);

// get a subcategory by ID
router.get("/:id", getSubCategoryById);

// update a subcategory by ID
router.put("/:id", protect, isAdmin, updateSubCategory);

// toggle subcategory status
router.patch("/:id/toggle-status", toggleSubCategoryStatus);

// delete a subcategory by ID
router.delete("/:id", protect, isAdmin, deleteSubCategory);

export default router;
