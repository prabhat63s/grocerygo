import express from 'express';
import {
    createTopDeal,
    getTopDeals,
    deleteTopDeal,
} from '../controllers/topDealController.js';

const router = express.Router();

// Create a new top deal
router.post('/', createTopDeal);

// Get all top deals
router.get('/', getTopDeals);

// Delete a top deal by ID
router.delete('/:id', deleteTopDeal);

export default router;
