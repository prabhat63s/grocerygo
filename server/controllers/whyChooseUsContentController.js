import WhyChooseUsContent from "../models/whyChooseUsContentModel.js";

// Create
export const createWhyChooseUs = async (req, res) => {
  try {
    const { title, subTitle } = req.body;
    const domainName = req.protocol + "://" + req.get("host");

    const whyChooseUsContentImage = req.file ? `${domainName}/uploads/whychooseus/${req.file.filename}` : "";

    if (!whyChooseUsContentImage) {
      return res.status(400).json({ message: "Image upload failed or missing." });
    }

    const newItem = new WhyChooseUsContent({
      title,
      subTitle,
      whyChooseUsContentImage,
    });

    await newItem.save();
    res.status(201).json({ message: "WhyChooseUs created", item: newItem });
  } catch (err) {
    console.error("Create WhyChooseUs Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All
export const getAllWhyChooseUs = async (req, res) => {
  try {
    const items = await WhyChooseUsContent.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get One
export const getWhyChooseUsById = async (req, res) => {
  try {
    const item = await WhyChooseUsContent.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update
export const updateWhyChooseUs = async (req, res) => {
  try {
    const { title, subTitle } = req.body;
    const domainName = req.protocol + "://" + req.get("host");

    const whyChooseUsContentImage = req.file ? `${domainName}/uploads/whychooseus/${req.file.filename}` : null;

    const item = await WhyChooseUsContent.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.title = title || item.title;
    item.subTitle = subTitle || item.subTitle;
    if (whyChooseUsContentImage) item.whyChooseUsContentImage = whyChooseUsContentImage;

    await item.save();
    res.status(200).json({ message: "WhyChooseUs updated", item });
  } catch (err) {
    console.error("Update WhyChooseUs Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete
export const deleteWhyChooseUs = async (req, res) => {
  try {
    const deleted = await WhyChooseUsContent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
