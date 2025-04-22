import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   textLink: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
   image: {
      type: String,
   },
   type: {
      type: String,
      enum: ['select', 'product', 'category', 'custom-link'],
      required: true,
   },
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: function () {
         return this.type === 'product';
      },
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: function () {
         return this.type === 'category';
      },
   },
   customLink: {
      type: String,
      required: function () {
         return this.type === 'custom-link';
      },
   },
   status: {
      type: Boolean,
      default: true,
  }
}, {
   timestamps: true,
});

export default mongoose.model('Slider', sliderSchema);
