import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, rating, feedback, date } = req.body;

    // Basic validation
    if (!email || !rating || !date) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Create a direct connection to the MySQL database
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Charizard@123',
        database: 'Car_Rental',
      });

      // Insert feedback into the Reviews table
      const query = `
        INSERT INTO Reviews (email, rating, feedback, date)
        VALUES (?, ?, ?, ?)
      `;
      const values = [email, rating, feedback, date];

      // Execute the query
      const [result] = await connection.execute(query, values);

      // Check if the insert was successful
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Feedback submitted successfully.' });
      } else {
        return res.status(500).json({ message: 'Failed to submit feedback.' });
      }
    } catch (error) {
      console.error('Error inserting feedback:', error);
      return res.status(500).json({ message: 'An error occurred while submitting feedback.' });
    }
  } else {
    // Handle other request methods (GET, PUT, DELETE)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
