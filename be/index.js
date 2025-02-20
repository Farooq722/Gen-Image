const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Unified from both branches

// Define allowed origins (Production + Development)
const allowedOrigins = [
    "https://gen-image-fe.vercel.app", 
    "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"], // Merged all methods
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Unified headers
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

// Default route to check if backend is running
app.get("/", (req, res) => {
  try {
    res.send("Backend working");
  }
  catch(error) {
    res.status(500).send("Backend Not Working: " + error.message);
  }
});

// Routes
app.use("/api/user", router);
app.use("/api/image", imgRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to database
connectDB();

module.exports = app;
