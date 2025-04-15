import Category from "../models/categoryModel.js";

// Create Category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const domainName = req.protocol + "://" + req.get("host");
        const image = req.file ? `${domainName}/uploads/category/${req.file.filename}` : "";

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({ name, image });
        await category.save();

        res.status(201).json({ message: "Category created", category });
    } catch (err) {
        console.error("Create Category Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Single Category
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const { name, status } = req.body;
        const domainName = req.protocol + "://" + req.get("host");

        // Log req.file to check if file is uploaded
        console.log("Uploaded File:", req.file);

        const image = req.file ? `${domainName}/uploads/category/${req.file.filename}` : null;

        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        // Update category details
        category.name = name || category.name;
        category.status = status !== undefined ? status : category.status;
        if (image) category.image = image;

        await category.save();
        res.status(200).json({ message: "Category updated", category });
    } catch (err) {
        console.error("Update Category Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
