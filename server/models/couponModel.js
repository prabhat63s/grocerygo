import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    usageType: {
        type: String,
        enum: ["limited", "unLimited"],
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    minOrderAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
