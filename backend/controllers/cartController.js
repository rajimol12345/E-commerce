import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        res.json(cart);
    } else {
        res.json({ cartItems: [] });
    }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { product, productId, qty } = req.body;
    const cleanId = product || productId;

    if (!cleanId) {
        res.status(400);
        throw new Error('Product ID is required');
    }

    const productDetails = await Product.findById(cleanId);

    if (!productDetails) {
        res.status(404);
        throw new Error('Product not found');
    }

    const { name, image, price } = productDetails;
    const quantity = Number(qty) || 1;

    console.log(`[addToCart] Processing request for user: ${req.user?._id}, product: ${cleanId}, qty: ${quantity}`);

    if (!req.user || !req.user._id) {
        console.error('[addToCart] User not found in request context');
        res.status(401);
        throw new Error('User not authenticated');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    // Use fetched product details or fallback to prevents validation errors
    const itemName = name || 'Unknown Product';
    const itemImage = image || '/images/placeholder.png';
    const itemPrice = price || 0;

    if (cart) {
        console.log(`[addToCart] Updating existing cart ${cart._id} for user ${req.user._id}`);

        // Data Repair & Cleanup
        const originalItemsCount = cart.cartItems.length;
        const validItems = [];

        for (let i = 0; i < cart.cartItems.length; i++) {
            let item = cart.cartItems[i];
            try {
                if (!item.product) {
                    console.warn(`[addToCart] Item at index ${i} has no product property, skipping.`);
                    continue;
                }

                if (!item.name || !item.image || item.price === undefined) {
                    console.log(`[addToCart] Repairing incomplete item: ${item.product}`);
                    const p = await Product.findById(item.product);
                    if (p) {
                        item.name = item.name || p.name || 'Unknown Product';
                        item.image = item.image || p.image || '/images/placeholder.png';
                        item.price = (item.price !== undefined) ? item.price : (p.price || 0);
                        validItems.push(item);
                    } else {
                        console.warn(`[addToCart] Product ${item.product} not found in DB, removing from cart.`);
                    }
                } else {
                    validItems.push(item);
                }
            } catch (err) {
                console.error(`[addToCart] Error processing item ${i}:`, err.message);
            }
        }

        cart.cartItems = validItems;

        // Check if product already exists in cart
        const itemIndex = cart.cartItems.findIndex(item =>
            item.product && item.product.toString() === cleanId.toString()
        );

        if (itemIndex > -1) {
            console.log(`[addToCart] Product found already in cart. Incrementing quantity.`);
            cart.cartItems[itemIndex].qty += quantity;
            cart.cartItems[itemIndex].name = itemName;
            cart.cartItems[itemIndex].image = itemImage;
            cart.cartItems[itemIndex].price = itemPrice;
        } else {
            console.log(`[addToCart] Product not in cart. Adding as new item.`);
            cart.cartItems.push({
                product: cleanId,
                name: itemName,
                qty: quantity,
                image: itemImage,
                price: itemPrice
            });
        }

        try {
            await cart.save();
            console.log(`[addToCart] Cart saved successfully.`);
            res.json(cart);
        } catch (saveErr) {
            console.error(`[addToCart] SAVE ERROR:`, saveErr);
            res.status(500).json({
                message: 'Internal Error: Failed to save cart data',
                error: saveErr.message,
                validationErrors: saveErr.errors
            });
        }
    } else {
        console.log(`[addToCart] Creating new cart for user ${req.user._id}`);
        try {
            const newCart = await Cart.create({
                user: req.user._id,
                cartItems: [{
                    product: cleanId,
                    name: itemName,
                    qty: quantity,
                    image: itemImage,
                    price: itemPrice
                }]
            });
            console.log(`[addToCart] New cart created.`);
            res.status(201).json(newCart);
        } catch (createErr) {
            console.error(`[addToCart] CREATE ERROR:`, createErr);
            res.status(500).json({ message: 'Internal Error: Failed to create cart', error: createErr.message });
        }
    }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.id);
        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        cart.cartItems = [];
        await cart.save();
        res.json(cart);
    } else {
        res.json({ message: 'Cart already empty' });
    }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartQty = asyncHandler(async (req, res) => {
    const { qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === req.params.id);
        if (itemIndex > -1) {
            cart.cartItems[itemIndex].qty = Number(qty);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404);
            throw new Error('Item not found in cart');
        }
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

export { getCart, addToCart, removeFromCart, clearCart, updateCartQty };
