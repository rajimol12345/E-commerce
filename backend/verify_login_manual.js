import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const verifyLogin = async () => {
    try {
        const email = 'admin@example.com';
        const password = '123456';

        console.log(`Checking Admin: ${email}`);
        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log('❌ Admin user NOT found in DB');
        } else {
            console.log('✅ Admin user FOUND');
            console.log(`   ID: ${admin._id}`);
            console.log(`   Role: ${admin.role}`);
            console.log(`   Hashed Password: ${admin.password.substring(0, 20)}...`);

            const isMatch = await bcrypt.compare(password, admin.password);
            console.log(`   bcrypt.compare('${password}', hash): ${isMatch}`);

            if (isMatch) {
                console.log('✅ Password Match Successful');
            } else {
                console.log('❌ Password Match FAILED');
            }
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

verifyLogin();
