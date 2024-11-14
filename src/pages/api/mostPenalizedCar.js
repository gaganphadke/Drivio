// pages/api/mostPenalizedCar.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Charizard@123',
    database: 'Car_Rental'
  };

  try {
    // Create a new database connection
    const connection = await mysql.createConnection(dbConfig);

    // Define your query to get the car with the highest penalty amount
    const query = `
      SELECT c.model, p.reg_num, SUM(p.penalty_amt) AS total_penalty
      FROM Penalties p
      JOIN Cars c ON p.reg_num = c.reg_num
      GROUP BY p.reg_num
      ORDER BY total_penalty DESC
      LIMIT 1;
    `;

    // Execute the query
    const [rows] = await connection.execute(query);

    // Close the connection
    await connection.end();

    // Check and respond with the result
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "No penalties found" });
    }
  } catch (error) {
    console.error("Error fetching most penalized car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
