import mongoose from "mongoose";

const whyChooseUsContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subTitle: {
        type: String,
        required: true,
        trim: true,
    },
    whyChooseUsContentImage: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("WhyChooseUsContent", whyChooseUsContentSchema);