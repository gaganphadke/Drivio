import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Charizard@123',
    database: 'Car_Rental',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, userType } = req.body;

        if (!email || !userType) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const table = userType === 'owner' ? 'Owners' : 'Customers';
            const emailColumn = userType === 'owner' ? 'owner_email' : 'customer_email';

            // Insert user into the appropriate table with a nullable password
            const query = `INSERT INTO ${table} (${emailColumn}) VALUES (?)`;
            await db.execute(query, [email]);

            res.status(201).json({ message: `User added as ${userType}` });
        } catch (error) {
            console.error('Database Insertion Error:', error);
            res.status(500).json({ message: 'Database error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
