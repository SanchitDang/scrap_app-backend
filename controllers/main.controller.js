import userModel from '../models/user.model.js';
import agentModel from '../models/agent.model.js';
import serviceRequestModel from '../models/serviceRequest.model.js';


// Users
export const addUser = async (req, res) => {
    try {
      const newUser = new userModel(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error adding user', error });
    }
};

export const getUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
};
  
  export const getUserById = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};


// Agents
export const addAgent = async (req, res) => {
    try {
      const newAgent = new agentModel(req.body);
      await newAgent.save();
      res.status(201).json(newAgent);
    } catch (error) {
      res.status(500).json({ message: 'Error adding agent', error });
    }
};

export const getAgents = async (req, res) => {
    try {
      const agents = await agentModel.find({});
      res.status(200).json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching agents', error });
    }
};
  
  export const getAgentById = async (req, res) => {
    try {
      const agent = await agentModel.findById(req.params.id);
      if (!agent) return res.status(404).json({ message: 'Agent not found' });
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching agent', error });
    }
};

export const updateAgentById = async (req, res) => {
  try {
    const updatedAgent = await agentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAgent) return res.status(404).json({ message: 'Agent not found' });
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating agent', error });
  }
};

export const deleteAgentById = async (req, res) => {
  try {
    const deletedAgent = await agentModel.findByIdAndDelete(req.params.id);
    if (!deletedAgent) return res.status(404).json({ message: 'Agent not found' });
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting agent', error });
  }
};


// Service Requests
export const addServiceRequest = async (req, res) => {
    try {
      const newServiceRequest = new serviceRequestModel(req.body);
      await newServiceRequest.save();
      res.status(201).json(newServiceRequest);
    } catch (error) {
      res.status(500).json({ message: 'Error adding service request', error });
    }
};

export const getServiceRequest = async (req, res) => {
    try {
      const serviceRequests = await serviceRequestModel.find({})
        .populate('user_id')
        .populate('agent_id');
      res.status(200).json(serviceRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service requests', error });
    }
};
  
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

export const updateServiceRequestById = async (req, res) => {
  try {
    const updatedServiceRequest = await serviceRequestModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user_id')
      .populate('agent_id');
    if (!updatedServiceRequest) return res.status(404).json({ message: 'Service request not found' });
    res.status(200).json(updatedServiceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service request', error });
  }
};

export const deleteServiceRequestById = async (req, res) => {
  try {
    const deletedServiceRequest = await serviceRequestModel.findByIdAndDelete(req.params.id);
    if (!deletedServiceRequest) return res.status(404).json({ message: 'Service request not found' });
    res.status(200).json({ message: 'Service request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service request', error });
  }
};
