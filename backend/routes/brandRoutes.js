import express from 'express';
const router = express.Router();
import {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
} from '../controllers/brandController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getBrands).post(protectAdmin, createBrand);
router
    .route('/:id')
    .get(getBrandById)
    .put(protectAdmin, updateBrand)
    .delete(protectAdmin, deleteBrand);

export default router;
