const Upload = require('../models/uploadModels'); // Ensure you have the Upload model imported
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ storage: storage });

const uploadControl = {
    uploadFile: async (req, res) => {
        try {
            // Ensure the file is uploaded
            if (!req.file) {
                return res.status(400).json({ msg: 'No file uploaded' });
            }

            // Create a mock public_id and URL
            const public_id = req.file.filename; // This will be the unique filename
            const url = `http://localhost:5000/uploads/${req.file.filename}`; // Local URL for the uploaded file

            // Create a new image entry in the database
            const newImage = new Upload({
                file: {
                    public_id: public_id,
                    url: url,
                },
            });

            // Save the new image to the database
            const savedImage = await newImage.save();

            // Return the public_id and url in the response
            return res.status(201).json({
                public_id: savedImage.file.public_id,
                url: savedImage.file.url,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = uploadControl;

// Export the multer middleware
module.exports.upload = upload;
