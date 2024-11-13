import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL user
  password: 'Charizard@123', // Update with your MySQL password
  database: 'Car_Rental', // Update with your database name
});

export default async function handler(req, res) {
  try {
    // The query you provided
    const query = `
      SELECT model
      FROM Cars
      WHERE num_of_times_used = (
        SELECT MAX(num_of_times_used)
        FROM Cars
      );
    `;

    db.execute(query, (error, results) => {
      if (error) {
        console.error('Error fetching best car:', error);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        // If the result is found, return the car's model
        const bestCar = results[0].model;
        res.status(200).json({ model: bestCar });
      } else {
        res.status(404).json({ message: 'No cars found' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
