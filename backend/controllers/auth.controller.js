const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
    
    try {
        const { name, email, password, confirmPassword } = req.body;
        // Validate required fields
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Verify password match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = new User({ name, email, password });
        const savedUser = await user.save();
        savedUser.password = undefined;
        res.status(201).json({ message: "User created successfully", data: savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user and return JWT token
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // Find user and verify credentials
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.password = undefined;
        res.status(200).json({ message: "Login successful", data: { token, user } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get current user profile
exports.getUser = async (req, res) => {
    try {
        // Get user from token
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = undefined;
        res.status(200).json({ message: "User fetched successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

