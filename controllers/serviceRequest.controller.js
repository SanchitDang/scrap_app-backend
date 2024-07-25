// controllers/serviceRequest.controller.js
import serviceRequestModel from '../models/serviceRequest.model.js';
import userModel from '../models/user.model.js';
import agentModel from '../models/agent.model.js';

// Create a new service request
export const addServiceRequest = async (req, res) => {
  try {
    const { user_id, agent_id } = req.body;
    const user = await userModel.findById(user_id);
    const agent = await agentModel.findById(agent_id);
    if (!user || !agent) return res.status(404).json({ message: 'User or Agent not found' });

    const newServiceRequest = new serviceRequestModel(req.body);
    await newServiceRequest.save();
    res.status(201).json(newServiceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error adding service request', error });
  }
};

// Get all service requests
export const getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await serviceRequestModel.find({})
      .populate('user_id')
      .populate('agent_id');
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service requests', error });
  }
};

// Get service request by ID
export const getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await serviceRequestModel.findById(req.params.id)
      .populate('user_id')
      .populate('agent_id');
    if (!serviceRequest) return res.status(404).json({ message: 'Service request not found' });
    res.status(200).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service request', error });
  }
};

// Update service request by ID
export const updateServiceRequestById = async (req, res) => {
  try {
    const { user_id, agent_id } = req.body;
    if (user_id) {
      const user = await userModel.findById(user_id);
      if (!user) return res.status(404).json({ message: 'User not found' });
    }
    if (agent_id) {
      const agent = await agentModel.findById(agent_id);
      if (!agent) return res.status(404).json({ message: 'Agent not found' });
    }

    const updatedServiceRequest = await serviceRequestModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user_id')
      .populate('agent_id');
    if (!updatedServiceRequest) return res.status(404).json({ message: 'Service request not found' });
    res.status(200).json(updatedServiceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service request', error });
  }
};

// Delete service request by ID
export const deleteServiceRequestById = async (req, res) => {
  try {
    const deletedServiceRequest = await serviceRequestModel.findByIdAndDelete(req.params.id);
    if (!deletedServiceRequest) return res.status(404).json({ message: 'Service request not found' });
    res.status(200).json({ message: 'Service request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service request', error });
  }
};
