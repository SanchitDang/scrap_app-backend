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
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  company_name: {
    type: String,
  },
  pan: {
    type: String,
  },
  gst: {
    type: String,
  },
  role : { 
    type: String, 
    enum: ['admin', 'inventory-manager'], 
    default: 'admin' 
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

const adminModel = mongoose.model('admin', adminSchema);
export default adminModel;
