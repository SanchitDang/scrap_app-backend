// controllers/admin.controller.js
import jwt from 'jsonwebtoken'; 
import adminModel from '../models/admin.model.js';

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

    // Send response with token and user data
    return res.status(200).json({
      message: "Successfully logged in.",
      result: {
        user,
        token, // Include the token in the response
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};
