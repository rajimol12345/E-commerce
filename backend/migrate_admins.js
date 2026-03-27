import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();

const migrateAdmins = async () => {
    await connectDB();

    try {
        const users = await User.find({ role: { $in: ['admin', 'superadmin'] } });
        console.log(`Found ${users.length} admin-like users to migrate.`);

        for (const user of users) {
            const existingAdmin = await Admin.findOne({ email: user.email });
            if (existingAdmin) {
                console.log(`Admin ${user.email} already exists.`);
                continue;
            }

            // Since we can't get the raw password, we have a problem.
            // We can copy the HASHED password if we disable pre-save hashing?
            // Or we just default them to a temporary password?
            // Or we copy the hash directly.

            // Mongoose pre-save runs on .save().
            // If we use Admin.create(), it runs pre-save.
            // If we use Admin.insertMany(), it might NOT run pre-save depending on options?
            // Actually, `insertMany` validates but hooks? 
            // "Model.create" fires save hooks. "Model.insertMany" fires save hooks (if option set? Default is true in 5.x+).

            // If we manually construct the object and use collection.insertOne?
            // Or just set a temp password. Setting temp password is safer/easier.

            await Admin.create({
                name: user.name,
                email: user.email,
                password: 'password123', // Default migration password
                role: 'admin'
            });
            console.log(`Migrated ${user.email}. Default password: "password123".`);
        }

        console.log('Migration complete.');
        process.exit();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateAdmins();
