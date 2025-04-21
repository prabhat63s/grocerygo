import Newsletter from '../models/newsletterModel.js';

// Create Subscription
export const subscribe = async (req, res) => {
   try {
      // Log the incoming request body
      console.log('Request Body:', req.body);

      const { email } = req.body;

      if (!email) {
         return res.status(400).json({ message: 'Email is required' });
      }

      const existing = await Newsletter.findOne({ email });
      if (existing) {
         return res.status(400).json({ message: 'Email already subscribed' });
      }

      const subscription = new Newsletter({ email });
      await subscription.save();
      res.status(201).json({ message: 'Subscribed successfully', data: subscription });
   } catch (error) {
      console.error(error);  // Log the error for better understanding
      res.status(500).json({ message: 'Server error', error: error.message });
   }
};


// Get All Subscriptions
export const getAllSubscribers = async (req, res) => {
   try {
      const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
      res.status(200).json(subscribers);
   } catch (error) {
      res.status(500).json({ message: 'Server error', error });
   }
};

// Delete Subscription
export const deleteSubscriber = async (req, res) => {
   try {
      const { id } = req.params;
      await Newsletter.findByIdAndDelete(id);
      res.status(200).json({ message: 'Subscription deleted' });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error });
   }
};
