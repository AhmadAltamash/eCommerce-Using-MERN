const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const path = require('path');

require('dotenv').config({ path: '../.env' });

const app = express()
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=>{
    res.json({msg:"this is example"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

// Routes
app.use('/user',require('./routes/userRoute'))
app.use('/api',require('./routes/categoryRoute'))
app.use('/api',require('./routes/uploadRoute'))
app.use('/api',require('./routes/productRoute'))

// Making Connection
const URI = process.env.MONGODB_URL;
console.log("MongoDB URL:", URI);

mongoose.connect(URI, {
    connectTimeoutMS: 10000, // 10 seconds timeout
    socketTimeoutMS: 45000,  // 45 seconds timeout for operations
}).then(() => {
    console.log("MongoDB connected");
}).catch(error => {
    console.log("MongoDB connection error:", error);
});
