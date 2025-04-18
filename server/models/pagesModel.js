import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['about', 'privacypolicy', 'refundpolicy', 'termsAndConditions'],
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Content', pagesSchema);
