import Content from '../models/pagesModel.js'

// Save or update content based on type
export const saveContent = async (req, res) => {
  try {
    const { type, content } = req.body;

    let item = await Content.findOne({ type });
    if (item) {
      item.content = content;
      await item.save();
    } else {
      item = await Content.create({ type, content });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to save content", error: error.message });
  }
};

// Get content based on type
export const getContent = async (req, res) => {
  try {
    const { type } = req.params;
    const item = await Content.findOne({ type });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch content", error: error.message });
  }
};
