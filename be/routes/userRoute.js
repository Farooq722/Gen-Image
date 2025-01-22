const express = require("express");
const { registerUser, loginUser, userCredits} = require("../controllers/userController");
const userAuth = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/credits", userAuth, userCredits);

module.exports = router;
