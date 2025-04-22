import mongoose from 'mongoose';
import Banner from '../models/bannerModel.js';

// Create a new banner
export const createBanner = async (req, res) => {
  try {
    const domainName = req.protocol + "://" + req.get("host");
    const bannerImage = req.file ? `${domainName}/uploads/banner/${req.file.filename}` : "";

    const { type, category, product } = req.body;

    if (!type) return res.status(400).json({ message: "Banner type is required" });
    if (!bannerImage) return res.status(400).json({ message: "Banner image is required" });

    if (!category && !product) {
      return res.status(400).json({ message: "Either category or product is required for this banner type" });
    }

    const banner = new Banner({
      type,
      bannerImage,
      category: category || null,
      product: product || null,
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: 'Create failed', error });
  }
};

// Get all banners based on type
export const getAllBanners = async (req, res) => {
  try {
    const { type } = req.query;

    const query = {};
    if (type) {
      query.type = type;
    }

    const banners = await Banner.find(query)
      .populate('category', 'name')
      .populate('product', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ data: banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Toggle banner status
export const toggleBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    banner.status = !banner.status;
    await banner.save();

    res.status(200).json({ message: "Banner status updated", status: banner.status });
  } catch (err) {
    console.error("Toggle Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single banner by ID
export const getBannerById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid banner ID' });
    }
    const banner = await Banner.findById(req.params.id)
      .populate('category', 'name')
      .populate('product', 'name');
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error });
  }
};

// Update banner
export const updateBanner = async (req, res) => {
  try {
    const domainName = req.protocol + "://" + req.get("host");
    const bannerImage = req.file ? `${domainName}/uploads/banner/${req.file.filename}` : undefined;

    const { type, category, product } = req.body;

    if (!type) return res.status(400).json({ message: "Banner type is required" });
    if (!category && !product) {
      return res.status(400).json({ message: "Either category or product is required for this banner type" });
    }

    const updatedData = {
      type,
      bannerImage: bannerImage || undefined,
      category: category || null,
      product: product || null,
    };

    const banner = await Banner.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error });
  }
};


// Delete banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};
