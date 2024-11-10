import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update with your MySQL user
    password: 'Charizard@123', // Update with your MySQL password
    database: 'Car_Rental', // Update with your database name
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { booking_id, payment_date, payment_method, status, amount_left } = req.body;

        if (!booking_id || !payment_date || !payment_method || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const query = `
      INSERT INTO Payments (booking_id, payment_date, payment_method, status, amount_left)
      VALUES (?, ?, ?, ?, ?)
    `;

        db.execute(query, [booking_id, payment_date, payment_method, status, amount_left], (error, results) => {
            if (error) {
                console.error('Error creating payment:', error);
                return res.status(500).json({ message: 'Database error' });
            }

            return res.status(201).json({ payment_id: results.insertId });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
