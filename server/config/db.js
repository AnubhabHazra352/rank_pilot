import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB Server Connected");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB Connection Error:", err.message);
        });
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error("Failed to connect to MongoDB on startup:", error.message);
        process.exit(1);
    }
}

export default connectDB;