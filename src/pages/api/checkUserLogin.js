import mysql from 'mysql2'; // Import mysql2 for direct connection
import bcrypt from 'bcryptjs';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Database host
  user: 'root', // Database user
  password: 'Charizard@123', // Database password
  database: 'Car_Rental', // Your database name
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    console.log('Received request with email:', email); // Log received email
    console.log('Received request with password:', password); // Log received password
    
    try {
      // Query the Customers table
      const customerQuery = 'SELECT * FROM Customers WHERE customer_email = ?';
      pool.query(customerQuery, [email], async (err, customerResults) => {
        if (err) {
          console.error('Database Error while querying Customers table:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Customer query results:', customerResults); // Log query results for Customers table

        if (customerResults.length > 0) {
          // Hash the incoming password
          const match = await bcrypt.compare(password, customerResults[0].customer_h_password);
          console.log('Password match result for Customer:', match); // Log the match result

          if (match) {
            console.log('User authenticated successfully in Customers table');
            return res.status(200).json({
              isValidUser: true,
              userType: 'customer', // Return the user type as customer
            });
          }
        }

        // If not found in the Customers table, check the Owners table
        const ownerQuery = 'SELECT * FROM Owners WHERE owner_email = ?';
        pool.query(ownerQuery, [email], async (err, ownerResults) => {
          if (err) {
            console.error('Database Error while querying Owners table:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          console.log('Owner query results:', ownerResults); // Log query results for Owners table

          if (ownerResults.length > 0) {
            // Compare the incoming password for Owner
            const match = await bcrypt.compare(password, ownerResults[0].owner_h_password);
            console.log('Password match result for Owner:', match); // Log the match result

            if (match) {
              console.log('User authenticated successfully in Owners table');
              return res.status(200).json({
                isValidUser: true,
                userType: 'owner', // Return the user type as owner
              });
            }
          }

          // If the user is not found or password doesn't match
          console.log('No matching user or incorrect password');
          return res.status(200).json({ isValidUser: false });
        });
      });
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // If method is not POST, return Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
