const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const debugUpdate = async () => {
    await connectDB();

    try {
        // Find a user - we know 'final@example.com' exists or similar
        // Let's find ANY user
        const user = await User.findOne({});

        if (user) {
            console.log(`Found user: ${user.name}`);

            // Simulate update without password
            user.name = "Debug Name Update";
            // user.password is NOT touched

            console.log("Attempting save without password mod...");
            await user.save();
            console.log("Save successful!");
        } else {
            console.log("No user found to test.");
        }
    } catch (error) {
        console.error("Save FAILED with error:");
        console.error(error);
    }

    process.exit();
};

debugUpdate();
