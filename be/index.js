const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");
const imgRouter = require("./routes/imageRoute");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

const corsOptions = {
    origin: ["http://localhost:5173", "https://gen-image-fe.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version", "Authorization"],
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