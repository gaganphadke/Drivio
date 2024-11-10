import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Charizard@123',
  database: 'Car_Rental',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Check if email exists in Customers table
      const [customers] = await pool.query(
        'SELECT * FROM Customers WHERE customer_email = ?',
        [email]
      );

      // If found in Customers table, return exists
      if (customers.length > 0) {
        return res.status(200).json({ exists: true });
      }

      // Check if email exists in Owners table
      const [owners] = await pool.query(
        'SELECT * FROM Owners WHERE owner_email = ?',
        [email]
      );

      // If found in Owners table, return exists
      if (owners.length > 0) {
        return res.status(200).json({ exists: true });
      }

      // If not found in either table, return does not exist
      return res.status(200).json({ exists: false });
    } catch (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
