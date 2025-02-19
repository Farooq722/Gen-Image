const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'https://gen-image-fe.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}

app.use(cors(corsOptions));
const port = process.env.PORT || 4000;

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