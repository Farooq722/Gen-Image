const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, X-CSRF-Token"
    );
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });
  

const allowedOrigins = [
    "http://localhost:5173", // Local development frontend
    "https://gen-image-fe.vercel.app" // Production frontend
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies or authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "X-CSRF-Token"
    ],
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend working");
});

app.use("/api/user", router);
app.use("/api/image", imgRouter);

app.listen(port, () => {
    console.log(`Port is running on ${port}`);
});
connectDB();