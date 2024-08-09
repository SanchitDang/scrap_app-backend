import { Router } from 'express';
import { getEnabledAdmins } from '../controllers/admin.controller.js';
import { getEnabledCategories } from "../controllers/category.controller.js";
import { getEnabledProducts } from "../controllers/product.controller.js";
import { getEnabledAgents } from "../controllers/agent.controller.js";

const router = Router();

router.get('/getEnabledAdmins', getEnabledAdmins);
router.get('/getEnabledAgents', getEnabledAgents);
router.get('/getEnabledProducts', getEnabledProducts);
router.get('/getEnabledCategories', getEnabledCategories);

export default router;