import db from 'G:/Projects/Drivio/backend/config/db.js'; // Adjust path if necessary
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { regNum, customerId, rating, feedback } = req.body;

    if (!regNum || !customerId || !rating) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const date = new Date().toISOString().slice(0, 10);
      const [result] = await db.execute(
        'INSERT INTO Reviews (reg_num, customer_id, rating, feedback, date) VALUES (?, ?, ?, ?, ?)',
        [regNum, customerId, rating, feedback, date]
      );

      res.status(200).json({ message: 'Feedback submitted successfully.', reviewId: result.insertId });
    } catch (error) {
      console.error('Error inserting feedback:', error);
      res.status(500).json({ error: 'Database error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
