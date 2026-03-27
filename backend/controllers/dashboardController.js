import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);

    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({});

    const dailySales = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalSales: { $sum: '$totalPrice' },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    const monthlySales = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                totalSales: { $sum: '$totalPrice' },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name');


    res.json({
        totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
        totalOrders,
        totalProducts,
        totalUsers,
        dailySales,
        monthlySales,
        recentOrders,
    });
});

export { getDashboardStats };
