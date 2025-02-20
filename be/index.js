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

// Define allowed origins (Production + Development)
const allowedOrigins = ["https://gen-image-fe.vercel.app", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "HEAD", "PATCH", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// Middleware to handle CORS headers
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.status(200).send("OK");
//   }

//   next();
// });

// Set port from environment or default to 4000
const port = process.env.PORT || 4000;

// Default route to check if backend is running
app.get("/", (req, res) => {
  try {
    res.send("Backend working");
  }
  catch(error) {
    res.status(500).send("Backend Not Working: ", error.message);
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
