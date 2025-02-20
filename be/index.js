const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000;

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
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

app.use(cors(corsOptions));

// Default route to check if backend is running
app.get("/", (req, res) => {
  res.send("Backend working");
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