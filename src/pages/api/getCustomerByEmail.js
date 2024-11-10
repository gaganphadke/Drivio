import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL user
  password: 'Charizard@123', // Update with your MySQL password
  database: 'Car_Rental', // Update with your database name
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    
    const query = 'SELECT customer_id FROM Customers WHERE customer_email = ?';
    
    db.execute(query, [email], (error, results) => {
      if (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      return res.status(200).json(results[0]);
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
