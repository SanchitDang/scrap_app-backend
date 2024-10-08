import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
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

const productModel = mongoose.model('Product', productSchema);
export default productModel;
