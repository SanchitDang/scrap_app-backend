// routes/serviceRequest.routes.js
import { Router } from "express";
import { addServiceRequest, getServiceRequests, getServiceRequestById, updateServiceRequestById, deleteServiceRequestById } from '../controllers/serviceRequest.controller.js';

const router = Router();

router.post('/', addServiceRequest);
router.get('/', getServiceRequests);
router.get('/:id', getServiceRequestById);
router.put('/:id', updateServiceRequestById);
router.delete('/:id', deleteServiceRequestById);

export default router;
