// authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('G:/Projects/Drivio/backend/config/db.js');
const bcrypt = require('bcrypt');

router.post('/login-signup', async (req, res) => {
  const { fname, lname, customer_email, customer_password, phone_number, c_addr, DL, Adhaar_num } = req.body;

  if (!customer_email || !customer_password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Hash the password  const hashedPassword = await bcrypt.hash(customer_password, 10);

  // Prepare the SQL query
  const sql = `INSERT INTO Customers (fname, lname, customer_email, customer_h_password, phone_number, c_addr, DL, Adhaar_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    fname || null,
    lname || null,
    customer_email,
    hashedPassword,
    phone_number || null,
    c_addr || null,
    DL || null,
    Adhaar_num || null
  ], (err, result) => {
    if (err) {
      console.error('Error inserting customer:', err);
      return res.status(500).json({ error: 'Failed to create customer' });
    }
    res.status(201).json({ message: 'Customer created successfully' });
  });
});

module.exports = router;
