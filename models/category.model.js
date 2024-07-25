// models/category.model.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, { timestamps: true });

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
