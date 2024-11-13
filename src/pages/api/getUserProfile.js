// /api/getUserProfile.js

import mysql from 'mysql2';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { email, userType } = req.query;

        if (!email || !userType) {
            return res.status(400).json({ error: 'Email and user type are required' });
        }

        // Database connection
        const connection = mysql.createConnection({
            host: 'localhost', 
            user: 'root',
            password: 'Charizard@123',
            database: 'Car_Rental',
        });

        try {
            // SQL query based on user type
            const query = userType === 'customer' 
                ? `SELECT fname, lname, customer_email AS email, phone_number AS phone, c_addr AS address, DL AS licenseNumber, Adhaar_num AS aadhar FROM Customers WHERE customer_email = ?`
                : `SELECT fname, lname, owner_email AS email, phone_number AS phone, o_addr AS address, DL AS licenseNumber, Adhaar_num AS aadhar FROM Owners WHERE owner_email = ?`;

            const [rows] = await connection.promise().query(query, [email]);

            if (rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user profile', details: error.message });
        } finally {
            connection.end();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
