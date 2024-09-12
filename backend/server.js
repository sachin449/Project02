// Path: backend/server.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // Import the app object

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
