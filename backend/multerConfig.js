// Path: backend/multerConfig.js

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Ensure the upload directory exists
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(config.fileUploadPath);
        ensureDirectoryExistence(uploadPath); // Ensure directory exists
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

// File filter for allowed MIME types
const fileFilter = (req, file, cb) => {
    if (config.allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only allowed file types are permitted.'), false);
    }
};

// Multer upload instance
const upload = multer({
    storage: storage,
    limits: { fileSize: config.maxFileSize },
    fileFilter: fileFilter
});

module.exports = upload;
