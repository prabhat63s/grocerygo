import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import ConnectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import whyChooseUsRoutes from './routes/whyChooseUsRoutes.js';
import pagesRoutes from './routes/pagesRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

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
app.use('/api/taxes', taxRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/why-choose-us", whyChooseUsRoutes);
app.use("/api/content", pagesRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/gallery', galleryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});