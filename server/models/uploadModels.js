const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    file: {
        public_id: { type: String, required: true }, // Ensure this is required
        url: { type: String, required: true }        // Ensure this is required
    }
});

module.exports = mongoose.model("Upload", uploadSchema);
