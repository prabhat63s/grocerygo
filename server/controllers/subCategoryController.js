import mongoose from "mongoose";
import SubCategory from "../models/subCategoryModel.js";

// Create a new subcategory
export const createSubCategory = async (req, res) => {
    try {
        let { name, category } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        // Convert category to ObjectId if it's a string
        if (typeof category === "string") {
            category = new mongoose.Types.ObjectId(category);
        }

        const newSubCategory = new SubCategory({
            name,
            category,
        });

        await newSubCategory.save();

        res.status(201).json(newSubCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all subcategories
export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate("category", "name");
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a subcategory by ID
export const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate("category", "name");
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle Category Status
export const toggleSubCategoryStatus = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        if (!subCategory) return res.status(404).json({ message: "subCategory not found" });

        subCategory.status = !subCategory.status;
        await subCategory.save();

        res.status(200).json({ message: "subCategory status updated", status: subCategory.status });
    } catch (err) {
        console.error("Toggle Status Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a subcategory
export const updateSubCategory = async (req, res) => {
    try {
        const { name, category } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subcategory
export const deleteSubCategory = async (req, res) => {
    try {
        const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!deletedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json({ message: "SubCategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};