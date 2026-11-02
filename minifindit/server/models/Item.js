const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        dateFound: {
            type: Date,
            required: true
        },
        image: {
            type: String,
            default: ""
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["Available", "Returned"],
            default: "Available"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);