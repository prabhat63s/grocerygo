import express from 'express'
import { createMessage, deleteMessage, getMessages } from '../controllers/contactUsController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);
router.delete("/:id", protect, isAdmin, deleteMessage);

export default router;
