import express from "express";
import { createGallery, deleteGallery, getAllGalleries, getGalleryById, updateGallery } from "../controllers/galleryController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";

const router = express.Router();
// Route to create an FAQ
router.post('/', protect, isAdmin, uploadImage.single("galleryImage"), createGallery);

// Route to get all FAQs
router.get('/', getAllGalleries);

// Route to get FAQ by ID
router.get('/:id', getGalleryById);

// Route to update FAQ
router.put('/:id', protect, isAdmin, uploadImage.single("galleryImage"), updateGallery);

// Route to delete FAQ
router.delete('/:id', protect, isAdmin, deleteGallery);

export default router;
