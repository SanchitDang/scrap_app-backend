// routes/serviceRequest.routes.js
import { Router } from "express";
import { addServiceRequest, getServiceRequests, getServiceRequestById, updateServiceRequestById, deleteServiceRequestById, addAgentToRequest, ignoreAgentToRequest } from '../controllers/serviceRequest.controller.js';

const router = Router();

router.post('/', addServiceRequest);
router.get('/', getServiceRequests);
router.get('/:id', getServiceRequestById);
router.put('/:id', updateServiceRequestById);
router.delete('/:id', deleteServiceRequestById);
router.post('/addAgentToRequest', addAgentToRequest);
router.post('/ignoreAgentToRequest', ignoreAgentToRequest);

export default router;
