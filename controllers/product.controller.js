// controllers/product.controller.js
import productModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';

// Create a new product
export const addProduct = async (req, res) => {
  try {
    const { category_id } = req.body;
    const category = await categoryModel.findById(category_id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({}).populate('category_id');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get all enabled products
export const getEnabledProducts = async (req, res) => {
  try {
    const products = await productModel.find({disabled: false}).populate('category_id');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate('category_id');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Update product by ID
export const updateProductById = async (req, res) => {
  try {
    const { category_id } = req.body;
    if (category_id) {
      const category = await categoryModel.findById(category_id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category_id');
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete product by ID
export const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
