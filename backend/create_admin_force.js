import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const createAdmin = async () => {
    try {
        const adminEmail = 'admin@example.com';
        const adminExists = await Admin.findOne({ email: adminEmail });

        if (adminExists) {
            console.log('Admin user already exists');
            // Update password to '123456' just in case
            adminExists.password = '123456';
            await adminExists.save();
            console.log('Admin password reset to 123456');
        } else {
            await Admin.create({
                name: 'Admin User',
                email: adminEmail,
                password: '123456',
                role: 'admin'
            });
            console.log('Admin user created');
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
