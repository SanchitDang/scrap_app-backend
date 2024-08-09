// controllers/admin.controller.js
import jwt from 'jsonwebtoken'; 
import adminModel from '../models/admin.model.js';
import agentModel from "../models/agent.model.js";
import userModel from "../models/user.model.js";
import serviceRequestModel from "../models/serviceRequest.model.js";

// Create a new admin
export const addAdmin = async (req, res) => {
  try {
    const newAdmin = new adminModel(req.body);
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error adding admin', error });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find({});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Get enabled admins
export const getEnabledAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find({disabled: false});
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin', error });
  }
};

// Update admin by ID
export const updateAdminById = async (req, res) => {
  try {
    const updatedAdmin = await adminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

// Delete admin by ID
export const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await adminModel.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error });
  }
};

// Disable Admin by ID
export const disableAdminById = async (req, res) => {
  try {
    const disabledAdmin = await adminModel.findByIdAndUpdate(
      req.params.id,
      { $set: { disabled: { $not: "$disabled" } } },
      { new: true }
    );

    if (!disabledAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin disabled status updated successfully', disabledAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Error disabling Admin', error: error.message });
  }
};

// Admin login
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required Fields not sent" });
    }

    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Validate password
    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect Password Provided" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, // Add any other user details you want to include in the token
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' } // Token expiration time
    );

    let expiresIn = "3600";
    let expireDate = new Date();

    expireDate.setHours(expireDate.getHours() + 1);

    return res.status(200).json({
      message: "Successfully logged in.",
      result: {
        expiresIn,
        expireDate,
        user,
        token, // Include the token in the response
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

// Dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const usersCount = await userModel.countDocuments();
    const agentsCount = await agentModel.countDocuments();
    const inventoryManagersCount = await adminModel.countDocuments({ role: 'inventory-manager' });
    const serviceRequestsCount = await serviceRequestModel.countDocuments();
    const completedServiceRequestsCount = await serviceRequestModel.countDocuments({ status: 'completed' });
    const pendingServiceRequestsCount = await serviceRequestModel.countDocuments({ status: 'pending' });
    const recentServiceRequests = await serviceRequestModel.find().sort({ createdAt: -1 }).limit(5);

    const dashboardData = {
      users: usersCount,
      agents: agentsCount,
      inventory_managers: inventoryManagersCount,
      service_requests: serviceRequestsCount,
      completed_service_requests: completedServiceRequestsCount,
      pending_service_requests: pendingServiceRequestsCount,
      recent_service_requests: recentServiceRequests
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};
