import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';
import Brand from './models/Brand.js';
import products from './data/products.js';

const categories = [
    { name: 'Furniture', description: 'Home and Office Furniture', image: '/uploads/sample-category.jpg' },
    { name: 'Hand Bag', description: 'Fashionable Hand Bags', image: '/uploads/sample-category.jpg' },
    { name: 'Shoe', description: 'Men and Women Shoes', image: '/uploads/sample-category.jpg' },
    { name: 'Headphone', description: 'High Quality Headphones', image: '/uploads/sample-category.jpg' },
    { name: 'Laptop', description: 'Latest Laptops', image: '/uploads/sample-category.jpg' },
    { name: 'Book', description: 'Bestselling Books', image: '/uploads/sample-category.jpg' },
    { name: 'Tech', description: 'Gadgets and Tech', image: '/uploads/sample-category.jpg' },
    { name: 'Sneakers', description: 'Trendy Sneakers', image: '/uploads/sample-category.jpg' },
    { name: 'Travel', description: 'Travel Accessories', image: '/uploads/sample-category.jpg' },
    { name: 'Accessories', description: 'General Accessories', image: '/uploads/sample-category.jpg' },
];

const importData = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_envato');
        console.log('MongoDB Connected via Seeder');

        console.log('Seeding Brands, Categories & Products...');

        // Clear existing data
        await Product.deleteMany();
        await Category.deleteMany();
        await Brand.deleteMany();

        // Seed Categories
        const createdCategories = [];
        for (const cat of categories) {
            let category = await Category.findOne({ name: cat.name });
            if (!category) {
                category = await Category.create(cat);
            }
            createdCategories.push(category);
        }

        // Seed Brands
        const uniqueBrandNames = [...new Set(products.map(p => p.brand))];
        const createdBrands = [];
        for (const brandName of uniqueBrandNames) {
            const brand = await Brand.create({
                name: brandName,
                description: `${brandName} brand`,
                image: '/uploads/sample-brand.jpg'
            });
            createdBrands.push(brand);
            console.log(`Created Brand: ${brandName}`);
        }

        // Seed Products
        const placeholderUser = new mongoose.Types.ObjectId();

        const sampleProducts = products.map(product => {
            const cat = createdCategories.find(c => c.name === product.category);
            const brand = createdBrands.find(b => b.name === product.brand);

            return {
                ...product,
                user: placeholderUser,
                category: cat ? cat._id : null,
                brand: brand ? brand._id : null,
                sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            };
        });

        await Product.insertMany(sampleProducts);
        console.log('Products Imported!');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();
