import express from 'express';
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
} from '../controllers/bannerController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

router.post('/', protect, isAdmin, uploadImage.single("bannerImage"), createBanner);
router.get('/', getAllBanners);
router.get('/:id', getBannerById);
// toggle banncer status
router.patch("/:id/toggle-status", toggleBannerStatus);
router.put('/:id', protect, isAdmin, uploadImage.single("bannerImage"), updateBanner);
router.delete('/:id', protect, isAdmin, deleteBanner);

export default router;
