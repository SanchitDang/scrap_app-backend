import { Router } from 'express';
import { getDashboardData, toggleStatusById } from '../controllers/admin.controller.js';
import { changeServiceRequestStatus } from '../controllers/serviceRequest.controller.js';
import { uploadProfilePic } from "../controllers/combined.controller.js";

const router = Router();

router.get('/', getDashboardData);
router.put('/changeServiceRequestStatus/:id', changeServiceRequestStatus);
router.put('/toggleStatusById', toggleStatusById);
router.put('/uploadProfilePic', uploadProfilePic);

export default router;