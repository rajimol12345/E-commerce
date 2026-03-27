import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getProductsByCategory,
} from '../controllers/productController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protectAdmin, createProduct);
router.route('/category/:id').get(getProductsByCategory);
router.route('/:id/reviews').post(protect, createProductReview);
router
    .route('/:id')
    .get(getProductById)
    .delete(protectAdmin, deleteProduct)
    .put(protectAdmin, updateProduct);

export default router;
