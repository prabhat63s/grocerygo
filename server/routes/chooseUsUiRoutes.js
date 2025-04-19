import express from "express";
import { uploadImage } from "../middleware/uploadImage.js";
import ChooseUsUi from "../models/chooseUsUIModel.js";

const router = express.Router();

// Create
router.post("/", uploadImage.single("chooseUsUiImage"), async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;

    if (!title?.trim() || !subTitle?.trim() || !description?.trim() || !req.file) {
      return res.status(400).json({ message: "All fields are required including image" });
    }

    const domainName = req.protocol + "://" + req.get("host");
    const imageUrl = `${domainName}/uploads/chooseUsUi/${req.file.filename}`;

    const newEntry = new ChooseUsUi({
      title: title.trim(),
      subTitle: subTitle.trim(),
      description: description.trim(),
      chooseUsUiImage: imageUrl,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all
router.get("/", async (req, res) => {
  try {
    const data = await ChooseUsUi.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Update
router.put("/:id", uploadImage.single("chooseUsUiImage"), async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;

    const updatedData = {
      title: title?.trim(),
      subTitle: subTitle?.trim(),
      description: description?.trim(),
    };

    if (req.file) {
      const domainName = req.protocol + "://" + req.get("host");
      updatedData.chooseUsUiImage = `${domainName}/uploads/chooseUsUi/${req.file.filename}`;
    }

    const updated = await ChooseUsUi.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updated) return res.status(404).json({ message: "Item not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating item" });
  }
});

export default router;
