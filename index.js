require('dotenv').config();
const express = require('express');
const connectDB = require('./app/config/db');
const router = require('./app/routes/user.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/', (req, res) => {
  res.send('Uber API is running and connected to MongoDB');
});
app.use('/api/users',router)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
