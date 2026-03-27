import asyncHandler from 'express-async-handler';
import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    if (wishlist) {
        res.json(wishlist);
    } else {
        res.json({ products: [] });
    }
});

// @desc    Toggle item in wishlist
// @route   POST /api/wishlist
// @access  Private
const toggleWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
        const productIndex = wishlist.products.findIndex(p => p.toString() === productId);

        if (productIndex > -1) {
            // Remove if exists
            wishlist.products.splice(productIndex, 1);
        } else {
            // Add if not exists
            wishlist.products.push(productId);
        }
        await wishlist.save();
        res.json(wishlist);
    } else {
        // Create new wishlist
        const newWishlist = await Wishlist.create({
            user: req.user._id,
            products: [productId]
        });
        res.status(201).json(newWishlist);
    }
});

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private
const clearWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
        wishlist.products = [];
        await wishlist.save();
        res.json(wishlist);
    } else {
        res.json({ message: 'Wishlist already empty' });
    }
});

export { getWishlist, toggleWishlist, clearWishlist };
