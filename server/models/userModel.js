import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    profileImage: {
        type: String,
        default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F71%2Ff3%2F51%2F71f3519243d136361d81df71724c60a0.jpg&tbnid=JJfJEVvl2sxtrM&vet=10CAIQxiAoAGoXChMIoIuJnKDPjAMVAAAAAB0AAAAAEAY..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fuser-pictures-by-anna-litviniuk--536702480572227623%2F&docid=cAT5dOIOLmlEFM&w=512&h=512&itg=1&hl=en-US&ved=0CAIQxiAoAGoXChMIoIuJnKDPjAMVAAAAAB0AAAAAEAY",
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
