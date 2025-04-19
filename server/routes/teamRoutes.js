import express from 'express';
import { createTeam, getAllTeam, getTeamById, updateTeam, deleteTeam } from '../controllers/teamController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

router.post('/', protect, isAdmin, uploadImage.single("teamImage"), createTeam);
router.get('/', getAllTeam);
router.get('/:id', getTeamById);
router.put('/:id', protect, isAdmin, uploadImage.single("teamImage"), updateTeam);
router.delete('/:id', protect, isAdmin, deleteTeam);

export default router;
