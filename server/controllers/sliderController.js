import Slider from "../models/sliderModel.js";

// Create Slider
export const createSlider = async (req, res) => {
   try {
      const {
         title,
         type,
         cat_id,
         item_id,
         custom_link,
         link_text,
         description
      } = req.body;

      const domainName = req.protocol + "://" + req.get("host");
      const image = req.file ? `${domainName}/uploads/sliders/${req.file.filename}` : "";

      const newSlider = new Slider({
         title,
         type,
         textLink: link_text,
         description,
         image,
         product: type === 'product' ? item_id : null,
         category: type === 'category' ? cat_id : null,
         customLink: type === 'custom-link' ? custom_link : null,
      });

      await newSlider.save();
      res.status(201).json({ ...newSlider._doc, image });
   } catch (err) {
      res.status(500).json({ message: err.message });
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

      res.json(slider);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// update Slider
export const updateSlider = async (req, res) => {
   try {
      const { id } = req.params;
      const {
         title,
         type,
         cat_id,
         item_id,
         custom_link,
         link_text,
         description
      } = req.body;

      const domainName = req.protocol + "://" + req.get("host");
      const image = req.file ? `${domainName}/uploads/sliders/${req.file.filename}` : "";


      const updateData = {
         title,
         type,
         textLink: link_text,
         description,
         product: type === 'product' ? item_id : null,
         category: type === 'category' ? cat_id : null,
         customLink: type === 'custom-link' ? custom_link : null,
      };

      if (image) updateData.image = image;

      const updated = await Slider.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ message: "Slider not found" });

      res.json({ ...updated._doc, image });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};


// Toggle slider Status
export const toggleSliderStatus = async (req, res) => {
   try {
      const slider = await Slider.findById(req.params.id);
      if (!slider) return res.status(404).json({ message: "slider not found" });

      slider.status = !slider.status;
      await slider.save();

      res.status(200).json({ message: "slider status updated", status: slider.status });
   } catch (err) {
      console.error("Toggle Status Error:", err);
      res.status(500).json({ message: "Server error" });
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
