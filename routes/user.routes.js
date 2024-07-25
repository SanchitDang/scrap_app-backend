// routes/user.routes.js
import { Router } from "express";
import { addUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/user.controller.js';

const router = Router();

router.post('/', addUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
