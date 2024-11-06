const uploadControl = require('../controlers/uploadControl');
const router = require('express').Router();

// Use multer middleware for the upload route
router.route('/upload')
    .post(uploadControl.upload.single('image'), uploadControl.uploadFile); // 'image' should match the key in form-data

module.exports = router;
