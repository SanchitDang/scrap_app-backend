import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
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
    required: true 
  },
  password : {
    type : String,
    required : true
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
  image_url: {
    type: String,
    default:""
  },
  disabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const agentModel = mongoose.model('agent', agentSchema);
export default agentModel;
