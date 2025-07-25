require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protected');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Make sure this matches your frontend port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(' MongoDB connected locally'))
.catch(err => console.error(' MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });