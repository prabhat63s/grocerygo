import mongoose from 'mongoose'

const tutorialSchema = new mongoose.Schema({
   tutorialImage: { type: String, required: true },
   title: { type: String, required: true },
   message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Tutorial', tutorialSchema);
