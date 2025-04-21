import Banner from '../models/bannerModel.js';

// Create a new banner
export const createBanner = async (req, res) => {
  try {
    const domainName = req.protocol + "://" + req.get("host");
    const bannerImage = req.file ? `${domainName}/uploads/banner/${req.file.filename}` : "";

    const banner = new Banner({
      ...req.body,
      bannerImage,
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: 'Create failed', error });
  }
};

// Get all banner based on type
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

// Get single banner by ID
export const getBannerById = async (req, res) => {
  try {
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

    const updatedData = {
      ...req.body,
    };

    if (bannerImage) {
      updatedData.bannerImage = bannerImage;
    }

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
