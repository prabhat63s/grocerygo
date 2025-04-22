import TopDeal from '../models/topDealModel.js';

// Create a new Top Deal
export const createTopDeal = async (req, res) => {
    try {
        const newTopDeal = new TopDeal(req.body);
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
