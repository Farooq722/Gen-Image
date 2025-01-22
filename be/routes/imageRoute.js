
const express = require("express");
const { generateImage } = require("../controllers/imageController");
const userAuth = require("../middleware/auth");

const imgRouter = express.Router();

imgRouter.post("/gen-image", userAuth, generateImage);

module.exports = imgRouter;