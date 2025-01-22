const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

const corsOptions = {
    origin: "https://gen-image-fe.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  // Allow credentials
    optionsSuccessStatus: 200, // For legacy browser support
    exposedHeaders: ["Content-Length", "X-Total-Count"], // If you need to expose specific headers
    maxAge: 86400 // Cache preflight request results for 24 hours
};
  
  
  app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Backend working");
});

app.use("/api/user", router);
app.use("/api/image", imgRouter);

app.listen(port, () => {
    console.log(`Port is running on ${port}`);
});
connectDB();