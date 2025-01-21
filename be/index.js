const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const router = require("./routes/userRoute");

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend working");
});

app.use("/api/user", router);

app.listen(port, () => {
    console.log(`Port is running on ${port}`);
});
connectDB();