const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const itemRoutes = require("./routes/itemRoutes");

const app = express();
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/notifications", notificationRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Mini-FindIt Backend is Running!");
});

// Item API routes
app.use("/api/items", itemRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });