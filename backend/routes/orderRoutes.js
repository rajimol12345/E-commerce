import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, protectAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, protectAdmin, updateOrderToDelivered);
router.route('/:id/status').put(protect, protectAdmin, updateOrderStatus);

export default router;
