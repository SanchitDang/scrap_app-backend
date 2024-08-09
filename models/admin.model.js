import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name : { 
    type: String, 
    required: true 
  },
  email : {
    type: String, 
    required: true, 
    unique: true 
  },
  phone : {
    type: String, 
    required: true, 
    unique: true 
  },
  password : { 
    type: String, 
    required: true 
  },
  role : { 
    type: String, 
    enum: ['admin', 'inventory-manager'], 
    default: 'admin' 
  },
  image_url: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const adminModel = mongoose.model('admin', adminSchema);
export default adminModel;
