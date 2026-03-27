import express from 'express';
const router = express.Router();
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(protectAdmin, getDashboardStats);

export default router;
