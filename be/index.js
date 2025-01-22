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
    origin: process.env.NODE_ENV === "production"
      ? "https://gen-image-fe.vercel.app"
      : "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
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