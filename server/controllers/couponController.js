import Coupon from "../models/couponModel.js";

// Create Coupon
export const createCoupon = async (req, res) => {
    try {
        // Validate if usageType is limited, then check if usageLimit is provided
        if (req.body.usageType === "limited" && !req.body.usageLimit) {
            return res.status(400).json({ message: "Usage limit is required for limited coupons." });
        }

        // Ensure that the endDate is after startDate
        if (new Date(req.body.endDate) < new Date(req.body.startDate)) {
            return res.status(400).json({ message: "End date must be after start date." });
        }

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

// Toggle Coupon Status
export const toggleCouponStatus = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });

        coupon.status = !coupon.status;
        await coupon.save();

        res.status(200).json({ message: "Coupon status updated", status: coupon.status });
    } catch (err) {
        console.error("Toggle Status Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Coupon
export const updateCoupon = async (req, res) => {
    try {
        // Validate if usageType is limited, then check if usageLimit is provided
        if (req.body.usageType === "limited" && !req.body.usageLimit) {
            return res.status(400).json({ message: "Usage limit is required for limited coupons." });
        }

        // Ensure that the endDate is after startDate
        if (new Date(req.body.endDate) < new Date(req.body.startDate)) {
            return res.status(400).json({ message: "End date must be after start date." });
        }

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
