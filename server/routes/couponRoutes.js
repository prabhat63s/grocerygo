import express from "express";
import {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus
} from "../controllers/couponController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create a new coupon
router.post("/", protect, isAdmin, createCoupon);

// get all coupons
router.get("/", getCoupons);

// get a coupon by ID
router.get("/:id", getCouponById);

// toggle category status
router.patch("/:id/toggle-status", toggleCouponStatus);

// update a coupon by ID
router.put("/:id", protect, isAdmin, updateCoupon);

// delete a coupon by ID
router.delete("/:id", protect, isAdmin, deleteCoupon);

export default router;
