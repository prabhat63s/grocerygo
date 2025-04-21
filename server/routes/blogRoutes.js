import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/blogController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

// CRUD Routes
router.post('/', protect, isAdmin, uploadImage.single("blogImage"), createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/:id', protect, isAdmin, uploadImage.single("blogImage"), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
