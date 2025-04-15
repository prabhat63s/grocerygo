import express from "express";
import {
  createWhyChooseUs,
  getAllWhyChooseUs,
  getWhyChooseUsById,
  updateWhyChooseUs,
  deleteWhyChooseUs
} from "../controllers/whyChooseUsController.js";

import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";

const router = express.Router();

// create a new WhyChooseUs
router.post("/", protect, isAdmin, uploadImage.single("image"), createWhyChooseUs);

// get all WhyChooseUs items
router.get("/", getAllWhyChooseUs);

// get a WhyChooseUs item by ID
router.get("/:id", getWhyChooseUsById);

// update a WhyChooseUs item by ID
router.put("/:id", protect, isAdmin, uploadImage.single("image"), updateWhyChooseUs);

// delete a WhyChooseUs item by ID
router.delete("/:id", protect, isAdmin, deleteWhyChooseUs);

export default router;
