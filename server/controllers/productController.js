import mongoose from "mongoose";
import Product from "../models/productModel.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      name, sku, videoURL, category, subCategory, type,
      hasExtras, extras, hasVariants, variants,
      originalPrice, sellingPrice, stockManagement, stock, description, tax
    } = req.body;

    // Image
    const domainName = req.protocol + "://" + req.get("host");
    const productImage = req.files?.map(file => `${domainName}/uploads/products/${file.filename}`) || [];

    if (!name || !category || !type || !originalPrice || !sellingPrice || productImage.length === 0) {
      return res.status(400).json({ message: "Name, category, type, prices and at least one image are required." });
    }

    let parsedExtras = [], parsedVariants = [], parsedStockManagement = [], parsedTax = [];
    try {
      parsedExtras = extras ? JSON.parse(extras) : [];
      parsedVariants = variants ? JSON.parse(variants) : [];
      parsedStockManagement = stock ? JSON.parse(stock) : [];
      parsedTax = tax ? Array.isArray(tax) ? tax : [tax] : [];
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format in extras, variants, or stock." });
    }

    const normalizedName = name.trim();
    const productExists = await Product.findOne({ name: normalizedName });
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Convert category to ObjectId if it's a string
    let parsedCategory = category;
    if (typeof category === "string") {
      parsedCategory = new mongoose.Types.ObjectId(category);
    }


    const product = new Product({
      name: normalizedName,
      sku,
      videoURL,
      category: parsedCategory,
      subCategory,
      type,
      hasExtras,
      extras: parsedExtras,
      hasVariants,
      variants: parsedVariants,
      originalPrice,
      sellingPrice,
      stockManagement,
      stock: parsedStockManagement,
      description,
      tax: parsedTax,
      productImage
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("subCategory").populate("tax");

    const total = await Product.countDocuments();
    res.json({ total, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category").populate("subCategory").populate("tax");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, sku, videoURL, category, subCategory, type,
      hasExtras, extras, hasVariants, variants,
      originalPrice, sellingPrice, stockManagement, stock, description, tax,
    } = req.body;

    // Parse JSON data for extras, variants, and stockManagement
    let parsedExtras = [], parsedVariants = [], parsedStockManagement = [], parsedTax = [];
    try {
      parsedExtras = extras ? JSON.parse(extras) : [];
      parsedVariants = variants ? JSON.parse(variants) : [];
      parsedStockManagement = stock ? JSON.parse(stock) : [];
      parsedTax = tax ? Array.isArray(tax) ? tax : [tax] : [];
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format in extras, variants, or stock." });
    }

    // Find the existing product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    product.name = name || product.name;
    product.sku = sku || product.sku;
    product.videoURL = videoURL || product.videoURL;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.type = type || product.type;
    product.hasExtras = hasExtras !== undefined ? hasExtras : product.hasExtras;
    product.extras = parsedExtras.length > 0 ? parsedExtras : product.extras;
    product.hasVariants = hasVariants !== undefined ? hasVariants : product.hasVariants;
    product.variants = parsedVariants.length > 0 ? parsedVariants : product.variants;
    product.originalPrice = originalPrice || product.originalPrice;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.stockManagement = stockManagement !== undefined ? stockManagement : product.stockManagement;
    product.stock = parsedStockManagement.length > 0 ? parsedStockManagement : product.stock;
    product.description = description || product.description;
    product.tax = parsedTax.length > 0 ? parsedTax : product.tax;

    // Handle image updates (optional, only update if new images are provided)
    // if (productImage) {
    //   const domainName = req.protocol + "://" + req.get("host");
    //   const updatedImages = req.files?.map(file => `${domainName}/uploads/products/${file.filename}`) || [];
    //   product.productImage = updatedImages.length > 0 ? updatedImages : product.productImage;
    // }
    if (req.files && req.files.length > 0) {
      const domainName = req.protocol + "://" + req.get("host");
      const updatedImages = req.files.map(file => `${domainName}/uploads/products/${file.filename}`);
      product.productImage = updatedImages;
    }


    // Save the updated product
    await product.save();

    // Return the updated product
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find().populate("category").lean();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by subcategory
export const getProductsBySubcategory = async (req, res) => {
  try {
    const products = await Product.find({ subCategory: req.params.subCategoryId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by search query
export const getProductsBySearchQuery = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { sku: { $regex: query, $options: "i" } }
      ]
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Recently added products
export const getRecentlyAddedProducts = async (req, res) => {
  try {
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const products = await Product.find().sort({ [sort]: order }).limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Best-selling products (placeholder logic)
export const getBestSellingProducts = async (req, res) => {
  try {
    // Assume future sales tracking feature
    const products = await Product.find().limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Top deals products (e.g., high discount)
export const getTopDealsProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $expr: {
        $gt: ["$originalPrice", "$sellingPrice"]
      }
    }).sort({ createdAt: -1 }).limit(10);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};