import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update with your MySQL user
    password: 'Charizard@123', // Update with your MySQL password
    database: 'Car_Rental', // Update with your database name
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { reg_num, customer_id, start_date, end_date, total_price, status } = req.body;

        if (!reg_num || !customer_id || !start_date || !end_date || !total_price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const query = `
      INSERT INTO Booking (reg_num, customer_id, start_date, end_date, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        db.execute(query, [reg_num, customer_id, start_date, end_date, total_price, status], (error, results) => {
            if (error) {
                console.error('Error creating booking:', error);
                return res.status(500).json({ message: 'Database error' });
            }

            return res.status(201).json({ booking_id: results.insertId });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
