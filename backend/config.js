module.exports = {
    apiBaseUrl: 'http://localhost:5000/api',
    uploadDir: 'uploads/', 
    fileLimits: {
        maxFileSize: 5 * 1024 * 1024 
    },
    allowedFileTypes: /jpeg|jpg|png|pdf|docx/, 
    requestTimeout: 10000 
};
