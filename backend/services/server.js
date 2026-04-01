

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// ROUTES
import authRoutes from "../routes/authRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";
import aiRoutes from "../routes/aiRoutes.js";


const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= TEST =================
app.get("/", (req, res) => {
    res.send("API running...");
});

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${ PORT }`);
        });

    } catch (err) {
        console.log("❌ DB Error:", err);
    }
};

startServer();