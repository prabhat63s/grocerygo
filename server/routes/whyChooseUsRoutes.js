import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { createWhyChooseUs, deleteWhyChooseUs, getAllWhyChooseUs, getWhyChooseUsById, updateWhyChooseUs } from "../controllers/whyChooseUsContentController.js";

const router = express.Router();

// create a new WhyChooseUs
router.post("/", protect, isAdmin, uploadImage.single("whyChooseUsContentImage"), createWhyChooseUs);

// get all WhyChooseUs items
router.get("/", getAllWhyChooseUs);

// get a WhyChooseUs item by ID
router.get("/:id", getWhyChooseUsById);

// update a WhyChooseUs item by ID
router.put("/:id", protect, isAdmin, uploadImage.single("whyChooseUsContentImage"), updateWhyChooseUs);

// delete a WhyChooseUs item by ID
router.delete("/:id", protect, isAdmin, deleteWhyChooseUs);

export default router;
