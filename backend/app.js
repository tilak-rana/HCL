import express from "express";
import dotenv, { config } from "dotenv";
import cors from "cors";
import connectDb from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// const corsOptions = {
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//     credentials: true, // Allow cookies and authorization headers
// };

 connectDb(DATABASE_URL);
// app.use(cors(corsOptions));
// JSON डेटा को parse करने के लिए Middleware
app.use(express.json());
// Load route
app.use('/api/user', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is runing at http://localhost:${PORT}`);
})