const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// POST - Add a new item
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            dateFound: req.body.dateFound,
            image: req.file ? `/uploads/${req.file.filename}` : "",
            uploadedBy: req.user.id
        });

        const savedItem = await newItem.save();

        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Display all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find()
            .populate("uploadedBy", "name studentId email")
            .sort({ createdAt: -1 });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;