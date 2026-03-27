import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// @desc    Process Stripe payment
// @route   POST /api/payment/stripe/process
// @access  Private
const processStripePayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata: { company: 'Muse Shopcart' },
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

// @desc    Send Stripe publishable key
// @route   GET /api/payment/stripe/config
// @access  Private
const sendStripeApiKey = asyncHandler(async (req, res) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
    });
});

export { processStripePayment, sendStripeApiKey };
