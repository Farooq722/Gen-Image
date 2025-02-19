const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/userData");

const registerUser = async (req, res) => {
    try {
        // CORS Headers
        res.header("Access-Control-Allow-Origin", "https://gen-image-fe.vercel.app");
        res.header("Access-Control-Allow-Credentials", "true");

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                msg: "Missing details",
                success: false,
                error: true
            });
        }

        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                msg: "User already exists",
                success: false,
                error: true
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(201).json({
            msg: "User registered successfully",
            token: token,
            user: { name: user.name },
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

const loginUser = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "https://gen-image-fe.vercel.app");
        res.header("Access-Control-Allow-Credentials", "true");

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: "Invalid details",
                success: false,
                error: true
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
                error: true
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid password",
                success: false,
                error: true
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            msg: "Logged in successfully",
            token: token,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

const userCredits = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "https://gen-image-fe.vercel.app");
        res.header("Access-Control-Allow-Credentials", "true");

        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
                error: true
            });
        }
        return res.status(200).json({
            credits: user.creditBalance,
            user: { name: user.name },
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message || "Internal Server Error",
            success: false,
            error: true
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    userCredits
};
