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
  },
  image_url: {
    type: String,
    default:""
  },
  disabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
