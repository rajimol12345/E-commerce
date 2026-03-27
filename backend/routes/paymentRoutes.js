import express from 'express';
const router = express.Router();
import { processStripePayment, sendStripeApiKey } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/stripe/process').post(protect, processStripePayment);
router.route('/stripe/config').get(protect, sendStripeApiKey);

export default router;
