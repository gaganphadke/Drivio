import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update with your MySQL user
    password: 'Charizard@123', // Update with your MySQL password
    database: 'Car_Rental', // Update with your database name
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { owner_id, reg_num, customer_id, start_date, end_date, amount_earned } = req.body;

        if (!owner_id || !reg_num || !customer_id || !start_date || !end_date || !amount_earned) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const query = `
            INSERT INTO RentalHistory (owner_id, reg_num, customer_id, start_date, end_date, amount_earned)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.execute(query, [owner_id, reg_num, customer_id, start_date, end_date, amount_earned], (error, results) => {
            if (error) {
                console.error('Error inserting rental history:', error);
                return res.status(500).json({ message: 'Database error' });
            }

            // Query to get the current num_of_times_used from Cars table
            const rentalCountQuery = `
                SELECT num_of_times_used FROM Cars WHERE reg_num = ?
            `;

            db.execute(rentalCountQuery, [reg_num], (error, carResults) => {
                if (error) {
                    console.error('Error retrieving car data:', error);
                    return res.status(500).json({ message: 'Database error' });
                }

                const currentRentalCount = carResults[0]?.num_of_times_used || 0; // Default to 0 if no value exists
                const updatedRentalCount = currentRentalCount + 1;

                // Update the Cars table with the new num_of_times_used value
                const updateCarQuery = `
                    UPDATE Cars
                    SET num_of_times_used = ?
                    WHERE reg_num = ?
                `;

                db.execute(updateCarQuery, [updatedRentalCount, reg_num], (updateError) => {
                    if (updateError) {
                        console.error('Error updating car rental count:', updateError);
                        return res.status(500).json({ message: 'Error updating car rental count' });
                    }

                    // Send response after updating rental count
                    return res.status(201).json({ history_id: results.insertId, rentalCount: updatedRentalCount });
                });
            });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
