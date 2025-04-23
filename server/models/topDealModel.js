import mongoose from 'mongoose';

const topDealSchema = new mongoose.Schema({
    dealType: {
        type: String,
        required: true,
        enum: ["1", "2"], // One Time, Daily
        default: "2"
    },
    topDeal: {
        type: Boolean,
        default: false
    },
    offerType: {
        type: String,
        required: true,
        enum: ["1", "2"],
        default: "2"
    },
    startDate: {
        type: Date,
        required: function() {
            return this.topDeal;  
        }
    },
    endDate: {
        type: Date,
        required: function() {
            return this.topDeal;
        }
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    discountType: {
        type: String,
        required: true,
        enum: ["fixed", "percentage"], // Fixed, Percentage
        default: "percentage"
    },
    discount: {
        type: Number,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    }]
}, { timestamps: true });

export default mongoose.model('TopDeal', topDealSchema);
