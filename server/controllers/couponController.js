import Coupon from "../models/couponModel.js";

// Create Coupon
export const createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Coupons
export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Coupon
export const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        res.json(coupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Coupon
export const updateCoupon = async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCoupon) return res.status(404).json({ message: "Coupon not found" });
        res.json(updatedCoupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Coupon
export const deleteCoupon = async (req, res) => {
    try {
        const deleted = await Coupon.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Coupon not found" });
        res.json({ message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
