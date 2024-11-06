import { createConnection } from 'mysql2/promise';

export default async function handler(req, res) {
    let connection;
    try {
        // Database connection
        connection = await createConnection({
            host: 'localhost', // Ensure it's a string
            user: 'root',
            password: 'Charizard@123',
            database: 'Car_Rental',
        });

        console.log("Connected to the database successfully");

        const [rows] = await connection.execute(`
            SELECT 
                CONCAT(c.fname, ' ', c.lname) AS clientName, 
                ca.model AS carType, 
                ca.reg_num AS carNumber, 
                b.status 
            FROM Booking b 
            JOIN Customers c ON b.customer_id = c.customer_id
            JOIN Cars ca ON b.reg_num = ca.reg_num
        `);

        console.log("Query executed successfully:", rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Database connection or query error:", error.message); // Log the error message
        res.status(500).json({ error: 'Failed to fetch data' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
