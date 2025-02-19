const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const userModel = require("../model/userData");


const registerUser = async(req, res) => {
    try {
        const { name, email, password }= req. body;
        if(!name || !email || !password) {
            return res.status(400).json({
                msg: "Missing details"
            });
        }

        const isUserExist = await userModel.findOne({ email });
        if(isUserExist) {
            return res.status(400).json({
                msg: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({
            msg: "User registered successfully",
            token: token,
            user: {name: user.name},
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message || error,
            error: true,
            success: false
        })
    }
}

const loginUser = async(req, res) => {

    try {

        const { email, password } = req.body;
        if(!email || !password ) {
            return res.status(400).json({
                msg: "Invalid details"
            });
        }

        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        return res.status(200).json({
            msg: "logged in successfully",
            token: token,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message || error,
            error: true,
            success: false
        });
    }
}

const userCredits = async(req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }
        res.status(200).json({
            credits: user.creditBalance,
            user: {name: user.name},
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message || error
        })
    }
}



module.exports = {
    registerUser,
    loginUser,
    userCredits,
}
