// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('/Users/gaganphadke/DBMS/Project/car-rental-app/backend/routes/authRoutes.js');
require('dotenv').config();

const app = express();
app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental App API!'); // You can customize this message
});
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
