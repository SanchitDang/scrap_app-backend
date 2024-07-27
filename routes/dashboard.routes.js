import { Router } from 'express';
import {
  getDashboardData
} from '../controllers/admin.controller.js';

const router = Router();

router.get('/', getDashboardData);

export default router;