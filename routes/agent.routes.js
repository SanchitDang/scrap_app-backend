// routes/agent.routes.js
import { Router } from "express";
import { addAgent, getAgents, getAgentById, updateAgentById, deleteAgentById } from '../controllers/agent.controller.js';

const router = Router();

router.post('/', addAgent);
router.get('/', getAgents);
router.get('/:id', getAgentById);
router.put('/:id', updateAgentById);
router.delete('/:id', deleteAgentById);

export default router;
