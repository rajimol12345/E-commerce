import asyncHandler from 'express-async-handler';
import Brand from '../models/Brand.js';

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.json(brands);
});

// @desc    Fetch single brand
// @route   GET /api/brands/:id
// @access  Public
const getBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        res.json(brand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;

    const brand = new Brand({
        name,
        description,
        image: image || '/uploads/sample-brand.jpg', // Default image
    });

    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
});

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const brand = await Brand.findById(req.params.id);

    if (brand) {
        brand.name = name || brand.name;
        brand.description = description || brand.description;
        if (req.body.image) {
            brand.image = req.body.image;
        }

        const updatedBrand = await brand.save();
        res.json(updatedBrand);
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        await Brand.deleteOne({ _id: brand._id });
        res.json({ message: 'Brand removed' });
    } else {
        res.status(404);
        throw new Error('Brand not found');
    }
});

export {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
};
