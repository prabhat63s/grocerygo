import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
   blogImage: { type: String, required: true },
   title: { type: String, required: true },
   message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema);
