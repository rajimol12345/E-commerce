import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        const email = 'admin@example.com';
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Admin user already exists');
            // Update password just in case
            userExists.password = bcrypt.hashSync('123456', 10);
            userExists.isAdmin = true; // Ensure admin rights
            await userExists.save();
            console.log('Admin password/role updated');
        } else {
            const user = await User.create({
                name: 'Admin User',
                email,
                password: bcrypt.hashSync('123456', 10),
                isAdmin: true, // Assuming isAdmin flag exists on User
            });
            console.log('Admin user created');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createAdmin();
