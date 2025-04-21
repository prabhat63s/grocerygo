import express from 'express';
import { subscribe, getAllSubscribers, deleteSubscriber } from '../controllers/newsletterController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', subscribe);
router.get('/', getAllSubscribers);
router.delete('/:id', protect, isAdmin, deleteSubscriber);

export default router;
