import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductsBySearchQuery,
  getRecentlyAddedProducts,
  getBestSellingProducts,
  getTopDealsProducts
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

// Create a new product
router.post('/', protect, isAdmin, uploadImage.array("productImage", 5), createProduct);

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Update a product
router.put('/:id', protect, isAdmin, uploadImage.array("productImage", 5), updateProduct);

// Delete a product
router.delete('/:id', protect, isAdmin, deleteProduct);

// Get products by category ID
router.get('/category/:categoryId', getProductsByCategory);

// Get products by subcategory ID
router.get('/subcategory/:subcategoryId', getProductsBySubcategory);

// Search products by query
router.get('/search/query', getProductsBySearchQuery);

// Recently added products
router.get('/recent/all', getRecentlyAddedProducts);

// Best selling products
router.get('/bestsellers/all', getBestSellingProducts);

// Top deals products
router.get('/deals/all', getTopDealsProducts);

export default router;
