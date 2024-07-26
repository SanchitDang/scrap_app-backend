// models/product.model.js
import mongoose from 'mongoose';
import categoryModel from './category.model.js';

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
  }
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);
export default productModel;
