import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';
import mongoose from 'mongoose';

// Helper to resolve string values to ObjectIds for Brand/Category
// Now auto-creates the entity if it doesn't exist to prevent blocking the user
const resolveOrCreateId = async (Model, value) => {
    if (!value) return null;
    if (mongoose.Types.ObjectId.isValid(value)) return value;

    // If it's a string name, find the document
    let doc = await Model.findOne({ name: { $regex: new RegExp(`^${value}$`, 'i') } });

    if (!doc) {
        console.log(`[resolveOrCreateId] ${Model.modelName} "${value}" not found. Creating new entry...`);
        doc = await Model.create({
            name: value,
            image: '/images/placeholder.png', // Default placeholder
            description: `Auto-created ${Model.modelName} for ${value}`
        });
    }

    return doc._id;
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const category = req.query.category && req.query.category !== 'all'
        ? { category: req.query.category } // Assuming ID is passed here, but let's be careful
        : {};

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
        .populate('category')
        .populate('brand')
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        discount,
        sku,
    } = req.body;

    if (!name || !price || !description || !image || !brand || !category || countInStock === undefined) {
        res.status(400);
        throw new Error('All required fields must be provided');
    }

    // Resolve brand and category names to IDs if necessary
    const brandId = await resolveOrCreateId(Brand, brand);
    const categoryId = await resolveOrCreateId(Category, category);

    const product = new Product({
        name,
        price,
        description,
        image,
        brand: brandId,
        category: categoryId,
        countInStock,
        discount: discount || 0,
        sku,
        user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        discount,
        sku,
        status,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price !== undefined ? price : product.price;
        product.description = description || product.description;
        product.image = image || product.image;

        if (brand) {
            product.brand = await resolveOrCreateId(Brand, brand);
        }

        if (category) {
            product.category = await resolveOrCreateId(Category, category);
        }

        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.discount = discount !== undefined ? discount : product.discount;
        product.sku = sku || product.sku;
        product.status = status || product.status;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc    Get products by category
// @route   GET /api/products/category/:id
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.id });
    res.json(products);
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getProductsByCategory,
};
