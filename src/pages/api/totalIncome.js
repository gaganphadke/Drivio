// pages/api/totalIncome.js
import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'Charizard@123',
  database: 'Car_Rental',
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT SUM(total_price) AS totalIncome FROM Booking');
      const totalIncome = rows[0].totalIncome || 0;
      res.status(200).json({ totalIncome });
    } catch (error) {
      console.error("Error fetching total income:", error);
      res.status(500).json({ error: "Error fetching total income" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
