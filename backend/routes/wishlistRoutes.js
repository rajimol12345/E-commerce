import express from 'express';
const router = express.Router();
import {
    getWishlist,
    toggleWishlist,
    clearWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, getWishlist)
    .post(protect, toggleWishlist)
    .delete(protect, clearWishlist);

export default router;
