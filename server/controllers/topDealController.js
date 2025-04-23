import TopDeal from '../models/topDealModel.js';

// Create a new Top Deal
export const createTopDeal = async (req, res) => {
    try {
        // Check if topDeal is true, then ensure startDate and endDate are provided
        const { topDeal, startDate, endDate } = req.body;

        // If topDeal is true, ensure startDate and endDate are provided
        if (topDeal && (!startDate || !endDate)) {
            return res.status(400).json({ message: "Start date and End date are required when topDeal is true" });
        }

        // Create a new TopDeal instance
        const newTopDeal = new TopDeal(req.body);

        // Save the TopDeal to the database
        const savedTopDeal = await newTopDeal.save();

        res.status(201).json(savedTopDeal);
    } catch (err) {
        res.status(500).json({ message: "Error creating top deal", error: err.message });
    }
};

// Get all Top Deals with populated product data
export const getTopDeals = async (req, res) => {
    try {
        const topDeals = await TopDeal.find()
            .populate('products.productId', 'name');

        res.status(200).json(topDeals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching top deals", error: err.message });
    }
};

// Delete a Top Deal by ID
export const deleteTopDeal = async (req, res) => {
    try {
        const deletedTopDeal = await TopDeal.findByIdAndDelete(req.params.id);
        if (!deletedTopDeal) return res.status(404).json({ message: "Top deal not found" });
        res.status(200).json({ message: "Top deal deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting top deal", error: err.message });
    }
};

// Update a Top Deal by ID
export const updateTopDeal = async (req, res) => {
    try {
        const { topDeal, startDate, endDate } = req.body;

        // If topDeal is true, ensure startDate and endDate are provided
        if (topDeal && (!startDate || !endDate)) {
            return res.status(400).json({ message: "Start date and End date are required when topDeal is true" });
        }

        const updatedTopDeal = await TopDeal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // This ensures that the updated document is returned
        );

        if (!updatedTopDeal) {
            return res.status(404).json({ message: "Top deal not found" });
        }

        res.status(200).json(updatedTopDeal);
    } catch (err) {
        res.status(500).json({ message: "Error updating top deal", error: err.message });
    }
};
