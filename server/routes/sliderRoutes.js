import express from 'express';
import { createSlider, deleteSlider, getAllSliders, getSliderById, toggleSliderStatus, updateSlider } from '../controllers/sliderController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

router.post('/', protect, isAdmin, uploadImage.single("image"), createSlider);
router.get('/', getAllSliders);
router.get('/:id', getSliderById);
router.put('/:id', protect, isAdmin, uploadImage.single("image"), updateSlider);
// toggle status
router.patch("/:id/toggle-status", toggleSliderStatus);
router.delete('/:id', protect, isAdmin, deleteSlider);

export default router;
