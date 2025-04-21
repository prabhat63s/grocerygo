import express from 'express';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadImage.js';
import {
  createTutorial,
  getAllTutorial,
  getTutorialById,
  updateTutorial,
  deleteTutorial
} from '../controllers/tutorialController.js';

const router = express.Router();

router.post('/', protect, isAdmin, uploadImage.single("tutorialImage"), createTutorial);
router.get('/', getAllTutorial);
router.get('/:id', getTutorialById);
router.put('/:id', protect, isAdmin, uploadImage.single("tutorialImage"), updateTutorial);
router.delete('/:id', protect, isAdmin, deleteTutorial);

export default router;
