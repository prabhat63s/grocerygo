import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['banner-section-1', 'banner-section-2', 'banner-section-3', 'banner-section-4'],
        required: true,
    },
    bannerImage: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
