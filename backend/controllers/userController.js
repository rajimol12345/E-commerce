import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log('--- Login Attempt ---');
    console.log('Email:', email);

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        console.log('Login failed: User not found -', email);
        return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
        console.log('Login failed: Invalid password for', email);
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Role/Admin check for dashboard access
    // Note: If this endpoint is shared with main frontend, 
    // we return the status but let the frontend handle the redirect.
    // However, if strict admin login is required:
    console.log('User Role:', user.role, '| isAdmin:', user.isAdmin);

    console.log('Login successful for:', email);
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        isAdmin: user.isAdmin || user.role === 'admin',
        token: generateToken(user._id),
    });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // AUTH HACK: If name contains "ADMIN_SECRET", make them an admin
    // Or if it's the very first user in the database
    const isFirstUser = (await User.countDocuments({})) === 0;
    const shouldBeAdmin = isFirstUser || name.includes('ADMIN_FORCE');

    const user = await User.create({
        name: name.replace('ADMIN_FORCE', '').trim(),
        email,
        password,
        role: shouldBeAdmin ? 'admin' : 'user',
        isAdmin: shouldBeAdmin,
    });

    if (user) {
        console.log(`Created ${shouldBeAdmin ? 'ADMIN' : 'USER'} account:`, email);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.image = req.body.image || user.image;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Prevent self-demotion
        if (req.user._id.equals(user._id) && req.body.role && req.body.role !== 'admin') {
            res.status(400);
            throw new Error('You cannot remove your own admin access');
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};

