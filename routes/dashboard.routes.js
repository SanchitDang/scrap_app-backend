import { Router } from 'express';
import { getDashboardData } from '../controllers/admin.controller.js';
import { changeServiceRequestStatus } from '../controllers/serviceRequest.controller.js';
import { uploadProfilePic } from "../controllers/combined.controller.js";

const router = Router();

router.get('/', getDashboardData);
router.put('/changeServiceRequestStatus/:id', changeServiceRequestStatus);
router.put('/uploadProfilePic', uploadProfilePic);

export default router;