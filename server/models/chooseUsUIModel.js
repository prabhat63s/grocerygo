import mongoose from "mongoose";

const chooseUsUiSchema = new mongoose.Schema({
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
    chooseUsUiImage: {
        type: String,
        required: true,
    },
},{timestamps: true});

export default mongoose.model("ChooseUsUi", chooseUsUiSchema);