import express from "express";
import {
  changePassword,
  getUserDetails,
  login,
  register,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get user profile (requires authentication)
router.get("/profile", protect, getUserDetails);

// Update user profile
router.put("/profile/update/:id", protect, uploadImage.single("profileImage"), updateUserProfile);

// Change password route
router.post("/change-password", protect, changePassword);

export default router;
