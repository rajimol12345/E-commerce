import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protectAdmin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route('/:id')
    .delete(protectAdmin, deleteUser)
    .get(protectAdmin, getUserById)
    .put(protectAdmin, updateUser);

export default router;
