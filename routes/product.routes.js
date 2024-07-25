import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/product.controller.js';

const router = Router();

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;
