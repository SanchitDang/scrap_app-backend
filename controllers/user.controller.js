// controllers/user.controller.js
import userModel from '../models/user.model.js';

// Create a new user
export const addUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Disable User by ID
export const disableUserById = async (req, res) => {
  try {
    const disabledUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: { disabled: { $not: "$disabled" } } },
      { new: true }
    );

    if (!disabledUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User disabled status updated successfully', disabledUser });
  } catch (error) {
    res.status(500).json({ message: 'Error disabling User', error: error.message });
  }
};
