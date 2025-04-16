import mongoose from "mongoose";

const extraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    stockQty: {
        type: Number,
        default: 0
    },
    minOrderQty: {
        type: Number,
        default: 1
    },
    maxOrderQty: {
        type: Number
    },
    lowQtyWarning: {
        type: Number
    },
    manageStock: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

const stockManagementSchema = new mongoose.Schema({
    stockQty: {
        type: Number
    },
    minOrderQty: {
        type: Number
    },
    maxOrderQty: {
        type: Number
    },
    lowQtyWarning: {
        type: Number
    },
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String
    },
    videoURL: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    type: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    },
    hasExtras: {
        type: Boolean,
        default: false
    },
    extras: [extraSchema],
    hasVariants: {
        type: Boolean,
        default: false
    },
    variants: [variantSchema],
    originalPrice: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    stockManagement: {
        type: Boolean,
        default: false
    },
    stock: [stockManagementSchema],
    productImage: [{
        type: String
    }],
    tax: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax'
    }],
    description: {
        type: String
    },
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);