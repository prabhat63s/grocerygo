import Tutorial from "../models/tutorialModel.js";

// Create a new tutorial
export const createTutorial = async (req, res) => {
   const { title, message } = req.body;
   const domainName = req.protocol + "://" + req.get("host");
   const tutorialImage = req.file ? `${domainName}/uploads/tutorial/${req.file.filename}` : "";

   const tutorial = new Tutorial({ tutorialImage, title, message, });

   try {
      const newTutorial = await tutorial.save();
      res.status(201).json(newTutorial);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};

// Get all tutorial
export const getAllTutorial = async (req, res) => {
   try {
      const tutorial = await Tutorial.find();
      res.json(tutorial);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Get a tutorial by ID
export const getTutorialById = async (req, res) => {
   try {
      const tutorial = await Tutorial.findById(req.params.id);
      if (!tutorial) {
         return res.status(404).json({ message: 'Tutorial not found' });
      }
      res.json(tutorial);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

// Update a tutorial by ID
export const updateTutorial = async (req, res) => {
   try {
      const { title, message } = req.body;
      const domainName = req.protocol + "://" + req.get("host");
      const tutorialImage = req.file ? `${domainName}/uploads/tutorial/${req.file.filename}` : null;

      // Build update object
      const updateData = { title, message };
      if (tutorialImage) {
         updateData.tutorialImage = tutorialImage;
      }

      const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!tutorial) {
         return res.status(404).json({ message: 'Tutorial not found' });
      }

      res.json({ message: 'Update successfully' });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
};


// Delete a tutorial by ID
export const deleteTutorial = async (req, res) => {
   try {
      const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
      if (!tutorial) {
         return res.status(404).json({ message: 'Tutorial not found' });
      }
      res.json({ message: 'tutorial deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};
