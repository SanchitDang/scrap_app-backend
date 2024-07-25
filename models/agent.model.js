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
    unique : true,
    required : true
  }
}, { timestamps: true });

const agentModel = mongoose.model('agent', agentSchema);
export default agentModel;