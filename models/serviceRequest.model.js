import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  agent_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'agent', 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  product: { 
    type: String, 
    required: true 
  },
  pick_address: {
    type: String,
    required: true 
  },
  pick_address_lat: { 
    type: Number, 
    required: true 
  },
  pick_address_lng: { 
    type: Number, 
    required: true 
  },
  status : { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  },
  description: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const serviceRequestModel = mongoose.model('serviceRequest', serviceRequestSchema);
export default serviceRequestModel;
