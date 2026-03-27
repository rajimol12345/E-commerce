import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

// Protect User Routes (checks User collection)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            try {
                // Look in User model first
                req.user = await User.findById(decoded.id).select('-password');

                // If not found, look in Admin model
                if (!req.user) {
                    req.user = await Admin.findById(decoded.id).select('-password');
                }
            } catch (findErr) {
                console.error('Error finding user by ID from token:', findErr);
                res.status(401);
                throw new Error('Not authorized, invalid token data');
            }

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            next();
        } catch (error) {
            console.error('Auth protect error:', error);
            res.status(401);
            throw new Error(error.message || 'Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Protect Admin Routes (Role Based)
const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the User model or Admin model
            let user = await User.findById(decoded.id).select('-password');
            if (!user) {
                user = await Admin.findById(decoded.id).select('-password');
            }
            req.user = user;

            if (req.user && (req.user.role === 'admin' || req.user.isAdmin)) {
                next();
            } else {
                res.status(401);
                throw new Error('Not authorized as an admin');
            }
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized as admin, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized as admin, no token');
    }
});

export { protect, protectAdmin };
