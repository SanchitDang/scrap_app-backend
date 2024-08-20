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
  },
  category: { 
    type: [String],
    required: true 
  },
  product: { 
    type: [String],
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
  type : {
    type: String,
    enum: ['waste-collection', 'buy-request', 'sell-request'],
  },
  description: {
    type: String,
    required: true
  },
  appointment_date: {
    type: String,
  },
  appointment_time: {
    type: String,
  },
  completion_date: {
    type: String,
  },
  amount_paid: {
    type: String,
  },
  amount_paid_each_product: [{
    quantity: {
      type: String,
    },
    product: {
      type: String,
    },
    amount_paid: {
      type: String, 
    }
  }]
}, { timestamps: true });

const serviceRequestModel = mongoose.model('serviceRequest', serviceRequestSchema);
export default serviceRequestModel;
