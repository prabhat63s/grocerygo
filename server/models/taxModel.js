import mongoose from 'mongoose';

const taxSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    taxType: {
        type: String, enum: ['1', '2'], required: true
    },
    tax: {
        type: Number, required: true, min: 0
    },
}, { timestamps: true });

const Tax = mongoose.model('Tax', taxSchema);
export default Tax;
