// import User from "../models/User.js";

// export const register = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).json({ message: "All fields required" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: "Username already taken" });
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({ username, password: hashedPassword });

//         res.status(201).json({ message: "User registered successfully", user });
//     } catch (err) {
//         console.error("Register error:", err.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export const login = async (req, res) => {
//     console.log("LOGIN HIT");
//     console.log(req.body);
//     try {
//         const { username, password } = req.body;

//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid login" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid login" });
//         }

//         // For now, return a simple token (replace with JWT later)
//         res.json({ token: user._id });
//     } catch (err) {
//         console.error("Login error:", err.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };





import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("USERNAME:", req.body?.username);
        console.log("PASSWORD:", req.body?.password);
        
        console.log("LOGIN HIT");
        console.log(req.body);

        const { username, password } = req.body || {};

        // safety check
        if (!username || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid login" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid login" });
        }

        // JWT token (IMPORTANT for future features)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            message: "Login successful",
            token,
            user: { name: user.username }
        });


    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};