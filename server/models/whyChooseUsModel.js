import mongoose from "mongoose";

const whyChooseUsSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
},{timestamps: true});

export default mongoose.model("WhyChooseUs", whyChooseUsSchema);