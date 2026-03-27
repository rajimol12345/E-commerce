import express from 'express';
const router = express.Router();
import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartQty
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .delete(protect, clearCart);

router.route('/:id')
    .put(protect, updateCartQty)
    .delete(protect, removeFromCart);

export default router;
