const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://gen-image-fe.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://gen-image-fe.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
      return res.status(200).send("OK");
  }

  next();
});

const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend working");
});

app.use("/api/user", cors(corsOptions), router);
app.use("/api/image", cors(corsOptions),  imgRouter);

app.listen(port, () => {
    console.log(`Port is running on ${port}`);
});
connectDB();