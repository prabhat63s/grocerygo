import mongoose from 'mongoose';

const taxSchema = new mongoose.Schema({
  name: {
    type: String, // 1: SGST, 2: CGST
    required: true,
    trim: true
  },
  taxType: {
    type: String,
    enum: ['1', '2'], // 1: Fixed(₹), 2: Percentage(%)
    required: true
  },
  tax: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: Boolean,
    default: true,
}
}, { timestamps: true });

const Tax = mongoose.model('Tax', taxSchema);
export default Tax;
