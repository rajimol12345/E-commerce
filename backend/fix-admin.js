import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const fixAdmin = async () => {
    try {
        const email = 'admin123@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`SUCCESS: Updated ${email} to admin.`);
        } else {
            console.log(`User ${email} not found.`);
            // Create it if not found?
            const newUser = await User.create({
                name: 'Admin User',
                email: email,
                password: 'password123', // temporary
                role: 'admin'
            });
            console.log(`Created new admin user: ${email}`);
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

fixAdmin();
