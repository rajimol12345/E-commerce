import express from 'express';
const router = express.Router();
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getCategories).post(protectAdmin, createCategory);
router
    .route('/:id')
    .get(getCategoryById)
    .put(protectAdmin, updateCategory)
    .delete(protectAdmin, deleteCategory);

export default router;
