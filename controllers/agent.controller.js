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

// Agent login
export const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required Fields not sent" });
    }

    const user = await agentModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Validate password
    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect Password Provided" });
    }

    return res.status(200).json({
      message: "Successfully logged in.",
      result: {
        user
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};