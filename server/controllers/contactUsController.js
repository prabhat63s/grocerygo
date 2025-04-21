import ContactUs from '../models/contactUsModel.js'

// Create new message
export const createMessage = async (req, res) => {
   try {
      const { fullName, email, message } = req.body;
      const newContactUs = new ContactUs({ fullName, email, message });
      await newContactUs.save();
      res.status(201).json({ success: true, message: "Message saved!" });
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
};

// Get all messages
export const getMessages = async (req, res) => {
   try {
      const messages = await ContactUs.find().sort({ createdAt: -1 });
      res.json(messages);
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
};

// Delete a message
export const deleteMessage = async (req, res) => {
   try {
      const { id } = req.params;
      await ContactUs.findByIdAndDelete(id);
      res.json({ success: true, message: "Message deleted." });
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
};
