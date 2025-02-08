import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
    const options = {
        useUnifiedTopology: true, // Ensure you're using boolean `true`
        dbName:'HCLtech',
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds if needed
    };

    try {
        await mongoose.connect(DATABASE_URL, options);
        console.log("Database connected successfully...");
    } catch (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDb;
