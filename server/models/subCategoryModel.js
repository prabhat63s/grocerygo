import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export default mongoose.model("SubCategory", subCategorySchema);