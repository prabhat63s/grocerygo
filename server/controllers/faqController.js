import Faq from "../models/faqModel.js";

// Create FAQ
export const createFaq = async (req, res) => {
   try {
      const { title, description } = req.body;
      const faq = new Faq({ title, description });
      await faq.save();
      res.status(201).json(faq);
   } catch (error) {
      res.status(400).json({ message: 'Error creating FAQ', error: error.message });
   }
};

// Get all FAQs
export const getAllFaqs = async (req, res) => {
   try {
      const faqs = await Faq.find();
      res.status(200).json(faqs);
   } catch (error) {
      res.status(400).json({ message: 'Error fetching FAQs', error: error.message });
   }
};

// Get FAQ by ID
export const getFaqById = async (req, res) => {
   try {
      const faq = await Faq.findById(req.params.id);
      if (!faq) {
         return res.status(404).json({ message: 'FAQ not found' });
      }
      res.status(200).json(faq);
   } catch (error) {
      res.status(400).json({ message: 'Error fetching FAQ', error: error.message });
   }
};

// Update FAQ
export const updateFaq = async (req, res) => {
   try {
      const { title, description } = req.body;
      const faq = await Faq.findByIdAndUpdate(
         req.params.id,
         { title, description },
         { new: true }
      );
      if (!faq) {
         return res.status(404).json({ message: 'FAQ not found' });
      }
      res.status(200).json(faq);
   } catch (error) {
      res.status(400).json({ message: 'Error updating FAQ', error: error.message });
   }
};

// Delete FAQ
export const deleteFaq = async (req, res) => {
   try {
      const faq = await Faq.findByIdAndDelete(req.params.id);
      if (!faq) {
         return res.status(404).json({ message: 'FAQ not found' });
      }
      res.status(200).json({ message: 'FAQ deleted successfully' });
   } catch (error) {
      res.status(400).json({ message: 'Error deleting FAQ', error: error.message });
   }
};