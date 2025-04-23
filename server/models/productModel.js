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
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
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
    stockManagement: {
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
        type: Number,
        required: true,
    },
    minOrderQty: {
        type: Number,
        required: true,
    },
    maxOrderQty: {
        type: Number,
        required: true,
    },
    lowQtyWarning: {
        type: Number,
        required: true,
    },
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
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
        type: Number,
        validate: {
            validator: function (v) {
                return this.hasVariants || v != null;
            },
            message: 'Original price is required when hasVariants is false.'
        }
    },
    sellingPrice: {
        type: Number,
        validate: {
            validator: function (v) {
                return this.hasVariants || v != null;
            },
            message: 'Selling price is required when hasVariants is false.'
        }
    },

    stockManagement: {
        type: Boolean,
        default: false
    },
    stock: {
        type: [stockManagementSchema],
        validate: {
            validator: function (v) {
                return this.hasVariants || (Array.isArray(v) && v.length > 0);
            },
            message: 'Stock is required when hasVariants is false.'
        }
    },

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
    todaySpecial: {
        type: Boolean,
        default: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);