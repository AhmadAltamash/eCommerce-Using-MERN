const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Place cors middleware at the top

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/user', require('./routes/userRoute'));
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/uploadRoute'));
app.use('/api', require('./routes/productRoute'));

// Serve the client build files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Catch-all to serve React frontend
  app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Root route for testing
app.get('/', (req, res) => {
  res.json({ msg: "This is an example response" });
});

// Connection to MongoDB
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
