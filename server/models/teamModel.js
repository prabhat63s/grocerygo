import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   designation: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   facebook: {
      type: String
   },
   youtube: {
      type: String
   },
   instagram: {
      type: String
   },
   teamImage: {
      type: String
   },
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);
