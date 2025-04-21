import Slider from "../models/sliderModel.js";

// Create Slider
export const createSlider = async (req, res) => {
   const { title, textLink, description, type, product, category, customLink, status, } = req.body;

   const domainName = req.protocol + "://" + req.get("host");
   const image = req.file ? `${domainName}/uploads/sliders/${req.file.filename}` : "";
   const slider = new Slider({ title, textLink, description, image, type, product, category, customLink, status, });

   try {
      const newSlider = await slider.save();
      res.status(201).json(newSlider);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// Get All
export const getAllSliders = async (req, res) => {
   try {
      const sliders = await Slider.find()
         .populate('product', 'name')
         .populate('category', 'name');
      res.json(sliders);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Get by ID
export const getSliderById = async (req, res) => {
   try {
      const slider = await Slider.findById(req.params.id)
         .populate('product', 'name')
         .populate('category', 'name');
      if (!slider) {
         return res.status(404).json({ message: 'Slider not found' });
      }
      res.json({ message: "Successfull Get" });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Update Slider
export const updateSlider = async (req, res) => {
   try {
      const { title, textLink, description, type, product, category, customLink, status, } = req.body;

      const domainName = req.protocol + "://" + req.get("host");
      const image = req.file ? `${domainName}/uploads/sliders/${req.file.filename}` : null;

      const updateData = { title, textLink, description, type, product, category, customLink, status, };

      if (image) {
         updateData.image = image;
      }

      const slider = await Slider.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!slider) {
         return res.status(404).json({ message: 'Slider not found' });
      }

      res.json({ message: 'Update successfully', slider });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// Delete
export const deleteSlider = async (req, res) => {
   try {
      const slider = await Slider.findByIdAndDelete(req.params.id);
      if (!slider) {
         return res.status(404).json({ message: 'Slider not found' });
      }
      res.json({ message: 'Slider deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};
