const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const Item = require("../models/Item");
const authMiddleware = require("../middleware/authMiddleware");

// POST - Send a claim notification
router.post("/claim/:itemId", authMiddleware, async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        if (!item.uploadedBy) {
            return res.status(400).json({
                message: "Uploader information is unavailable for this item"
            });
        }

        // Prevent students from claiming their own items
        if (item.uploadedBy.toString() === req.user.id) {
            return res.status(400).json({
                message: "You cannot claim your own item"
            });
        }

        if (item.status !== "Available") {
            return res.status(400).json({
                message: "This item is no longer available"
            });
        }

        // Prevent duplicate pending claims
        const existingClaim = await Notification.findOne({
            item: item._id,
            sender: req.user.id,
            status: "Pending"
        });

        if (existingClaim) {
            return res.status(400).json({
                message: "You have already sent a claim request"
            });
        }

        const notification = await Notification.create({
            item: item._id,
            sender: req.user.id,
            receiver: item.uploadedBy,
            message: `A student has claimed your item: ${item.name}`
        });

        res.status(201).json({
            message: "Claim request sent successfully!",
            notification
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET - View notifications received by the logged-in student
router.get("/", authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiver: req.user.id
        })
            .populate("sender", "name studentId")
            .populate("item", "name image location status")
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// PATCH - Accept a claim request
router.patch("/:notificationId/accept", authMiddleware, async (req, res) => {
    try {
        const notification = await Notification.findById(
            req.params.notificationId
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        // Only the item uploader can accept the claim
        if (notification.receiver.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to accept this request"
            });
        }

        if (notification.status !== "Pending") {
            return res.status(400).json({
                message: "This request has already been processed"
            });
        }

        const item = await Item.findById(notification.item);

        if (!item || item.status !== "Available") {
            return res.status(400).json({
                message: "This item is no longer available"
            });
        }

        // Mark item as returned
        item.status = "Returned";
        await item.save();

        // Accept the notification
        notification.status = "Accepted";
        await notification.save();

        res.json({
            message: "Claim accepted! Item marked as returned.",
            notification,
            item
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;