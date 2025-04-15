import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import ConnectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import whyChooseUsRoutes from './routes/whyChooseUsRoutes.js';

// Configure environment variables
dotenv.config();

const app = express();

// Set the port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Connect to MongoDB
ConnectDB();

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);

app.use("/api/coupons", couponRoutes);
app.use("/api/why-choose-us", whyChooseUsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});