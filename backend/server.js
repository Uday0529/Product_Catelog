require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Product Catelog API is running"
    });
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});