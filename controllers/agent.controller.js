// controllers/agent.controller.js
import agentModel from '../models/agent.model.js';

// Create a new agent
export const addAgent = async (req, res) => {
  try {
    const newAgent = new agentModel(req.body);
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding agent', error });
  }
};

// Get all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.find({});
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error });
  }
};

// Get all enabled agents
export const getEnabledAgents = async (req, res) => {
  try {
    const agents = await agentModel.find({disabled: false});
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error });
  }
};

// Get agent by ID
export const getAgentById = async (req, res) => {
  try {
    const agent = await agentModel.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agent', error });
  }
};

// Update agent by ID
export const updateAgentById = async (req, res) => {
  try {
    const updatedAgent = await agentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAgent) return res.status(404).json({ message: 'Agent not found' });
    res.status(200).json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating agent', error });
  }
};

// Delete agent by ID
export const deleteAgentById = async (req, res) => {
  try {
    const deletedAgent = await agentModel.findByIdAndDelete(req.params.id);
    if (!deletedAgent) return res.status(404).json({ message: 'Agent not found' });
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting agent', error });
  }
};

// Disable Agent by ID
export const disableAgentById = async (req, res) => {
  try {
    const disabledAgent = await agentModel.findByIdAndUpdate(
      req.params.id,
      { $set: { disabled: { $not: "$disabled" } } },
      { new: true }
    );

    if (!disabledAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ message: 'Agent disabled status updated successfully', disabledAgent });
  } catch (error) {
    res.status(500).json({ message: 'Error disabling Agent', error: error.message });
  }
};
