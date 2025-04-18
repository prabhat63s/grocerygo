import Gallery from '../models/galleryModel.js';

// Create
export const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const domainName = req.protocol + "://" + req.get("host");
    const galleryImage = `${domainName}/uploads/gallery/${req.file.filename}`;

    const newGallery = new Gallery({ galleryImage });
    await newGallery.save();

    res.status(201).json(newGallery);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const domainName = req.protocol + "://" + req.get("host");
    const galleryImage = `${domainName}/uploads/gallery/${req.file.filename}`;

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { galleryImage },  // Ensure galleryImage is updated
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Get all
export const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (err) {
    console.error("Get all error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: 'Not found' });
    res.json(gallery);
  } catch (err) {
    console.error("Get by ID error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete
export const deleteGallery = async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};
