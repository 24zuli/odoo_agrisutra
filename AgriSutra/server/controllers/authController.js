const {
    getUserByEmail,
    createUser,
    getUserById,
    getUserByUsername,
} = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const pool = require("../db");
const { resetPasswordMailTemplate } = require("../templates/resetPassword");

async function handleUserRegister(req, res) {
    const { name, username, email, password } = req.body;

    try {
        console.log("Received Registration Request:", req.body);

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await getUserByEmail(email);
        console.log("Existing User Check:", existingUser);

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        const newUser = await createUser(name, username, email, hashedPassword);
        console.log("New User Created:", newUser);

        const token = jwt.sign({ id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        res
            .status(201)
            .json({ message: "User created successfully", token, user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function handleUserProfile(req, res) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id); // Fetch by ID instead of username

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ name: user.name, email: user.email, username: user.username });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function handleUserLogin(req, res) {
    const { username, password } = req.body;

    try {
        console.log("Received Login Request:", req.body);

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // let user = await getUserByUsername(username);
        let user;

        // Check if input is an email
        if (username.includes("@")) {
            user = await getUserByEmail(username.toLowerCase());
        } else {
            user = await getUserByUsername(username);
        }

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password Valid:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username },
            process.env.JWT_SECRET, { expiresIn: "24h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function handleForgotPassword(req, res) {
    const { email } = req.body;
    console.log("body", req.body);
    try {
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );

        // Always return success even if the email doesn't exist (to prevent email enumeration)
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Email address is invalid." });
        }

        const user = userResult.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail
                pass: process.env.EMAIL_PASS, // Your App Password
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset Your Password",
            html: resetPasswordMailTemplate(resetLink),
        });

        res.json({ message: "Reset link has been sent to your email." });
    } catch (err) {
        console.log("Error sending reset email:", err);
        res.status(500).json({ error: "Error sending reset email" });
    }
}

async function handleResetPassword(req, res) {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
            hashedPassword,
            decoded.userId,
        ]);

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
}

module.exports = {
    handleUserRegister,
    handleUserProfile,
    handleUserLogin,
    handleForgotPassword,
    handleResetPassword,
};