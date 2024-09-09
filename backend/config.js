// Path: backend/config.js

module.exports = {
    fileUploadPath: './uploads', // Local path for storing uploaded files
    maxFileSize: 5 * 1024 * 1024, // 5 MB file size limit
    allowedFileTypes: [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'text/plain',          // For .txt files
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // For .docx files
    ]
};
