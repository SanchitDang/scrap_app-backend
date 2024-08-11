import upload from '../middleware/uploadMiddleware.js'; 
import adminModel from '../models/admin.model.js';
import agentModel from '../models/agent.model.js';
import userModel from '../models/user.model.js';
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

export const uploadProfilePic = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const { user_type, user_id } = req.body;
      
      let imagePath;
      let model;
      if (user_type === 'admin') {
        model = adminModel;
        imagePath = `/public/uploads/admin/${req.file.filename}`;
      } else if (user_type === 'agent') {
        model = agentModel;
        imagePath = `/public/uploads/agent/${req.file.filename}`;
      } else if (user_type === 'user') {
        model = userModel;
        imagePath = `/public/uploads/user/${req.file.filename}`;
      } else if (user_type === 'product') {
        model = productModel;
        imagePath = `/public/uploads/product/${req.file.filename}`;
      } else if (user_type === 'category') {
        model = categoryModel;
        imagePath = `/public/uploads/category/${req.file.filename}`;
      }

      if (!model) {
        return res.status(400).json({ message: 'Invalid user type' });
      }

      const user = await model.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.image_url = imagePath;
      await user.save();

      res.status(200).json({ message: 'Profile picture uploaded successfully', imageUrl: imagePath });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile picture', error });
    }
  });
};

export const toggleStatusById = async (req, res) => {
  try {
    const { user_type, user_id } = req.body;

    let model;
    if (user_type === 'admin') {
      model = adminModel;
    } else if (user_type === 'agent') {
      model = agentModel;
    } else if (user_type === 'user') {
      model = userModel;
    } else if (user_type === 'product') {
      model = productModel;
    } else if (user_type === 'category') {
      model = categoryModel;
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const document = await model.findById(user_id);

    if (!document) {
      return res.status(404).json({ message: `${user_type} not found` });
    }

    const updatedStatus = !document.disabled;

    const updatedDocument = await model.findByIdAndUpdate(
      user_id,
      { $set: { disabled: updatedStatus } },
      { new: true }
    );

    res.status(200).json({ message: `${user_type} ${updatedStatus ? 'disabled' : 'enabled'} successfully`, updatedDocument });
  } catch (error) {
    res.status(500).json({ message: `Error updating ${user_type} status`, error: error.message });
  }
};
