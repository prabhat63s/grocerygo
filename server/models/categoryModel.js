import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    categoryImage: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);