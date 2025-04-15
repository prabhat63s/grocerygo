import Product from "../models/productModel.js";

// Create product
export const createProduct = async (req, res) => {
    try {
      const {
        name, sku, videoURL, category, subCategory, type,
        hasExtras, extras, hasVariants, variants,
        originalPrice, sellingPrice, manageStock, stockQty,
        minOrderQty, maxOrderQty, lowQtyWarning,
        description, tax
      } = req.body;

      const domainName = req.protocol + "://" + req.get("host");
      const images = req.files?.map(file => `${domainName}/uploads/category/${file.filename}`) || [];

      const productExists = await Product.findOne({ name });
      if (productExists) {
        return res.status(400).json({ message: "Product already exists" });
      }

      const product = new Product({
        name,
        sku,
        videoURL,
        category,
        subCategory,
        type,
        hasExtras,
        extras,
        hasVariants,
        variants,
        originalPrice,
        sellingPrice,
        manageStock,
        stockQty,
        minOrderQty,
        maxOrderQty,
        lowQtyWarning,
        description,
        tax,
        images
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
    res.json(products);
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
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const updates = req.body;
      const domainName = req.protocol + "://" + req.get("host");

      const images = req.files?.map(file => `${domainName}/uploads/category/${file.filename}`);
      if (images && images.length) {
        product.images = images;
      }

      Object.assign(product, updates);

      await product.save();
      res.json({ message: "Product updated", product });
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
    const products = await Product.find({ category: req.params.categoryId });
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
      name: { $regex: query, $options: "i" }
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
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
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
