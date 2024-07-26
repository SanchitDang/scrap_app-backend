// routes/index.routes.js
import { Router } from "express";
import userRoutes from './user.routes.js';
import agentRoutes from './agent.routes.js';
import categoryRoutes from './category.routes.js'
import productRoutes from './product.routes.js'
import adminRoutes from './admin.routes.js'
import serviceRequestRoutes from './serviceRequest.routes.js';

const router = Router();

router.use('/admins', adminRoutes);
router.use('/users', userRoutes);
router.use('/agents', agentRoutes);
router.use('/serviceRequests', serviceRequestRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

export default router;
