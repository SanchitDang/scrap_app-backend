import { Router } from "express";
import { addCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById } from '../controllers/category.controller.js';

const router = Router();

router.post('/', addCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

export default router;
