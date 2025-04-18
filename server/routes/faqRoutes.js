import express from "express";
import { createFaq, getAllFaqs, getFaqById, updateFaq, deleteFaq } from "../controllers/faqController.js";

const router = express.Router();
// Route to create an FAQ
router.post('/create', createFaq);

// Route to get all FAQs
router.get('/all', getAllFaqs);

// Route to get FAQ by ID
router.get('/:id', getFaqById);

// Route to update FAQ
router.put('/:id', updateFaq);

// Route to delete FAQ
router.delete('/:id', deleteFaq);

export default router;
