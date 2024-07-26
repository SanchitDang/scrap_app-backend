import { Router } from 'express';
import {
  addAdmin,
  getAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  loginAdmin
} from '../controllers/admin.controller.js';

const router = Router();

router.post('/', addAdmin);
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);
router.post('/login', loginAdmin);

export default router;
