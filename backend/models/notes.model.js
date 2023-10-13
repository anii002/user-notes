const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = Notes = mongoose.model("notes", notesSchema);