import mysql from 'mysql2/promise'; // Using mysql2's promise-based API for async/await

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { email, userType, fname, lname, phone, address, licenseNumber, aadhar } = req.body;

        if (!email || !userType) {
            return res.status(400).json({ error: 'Email and user type are required' });
        }

        // Database connection
        const connection = await mysql.createConnection({
            host: 'localhost', 
            user: 'root',
            password: 'Charizard@123',
            database: 'Car_Rental',
        });

        try {
            // SQL query based on user type
            const query = userType === 'customer'
                ? `UPDATE Customers SET fname = ?, lname = ?, phone_number = ?, c_addr = ?, DL = ?, Adhaar_num = ? WHERE customer_email = ?`
                : `UPDATE Owners SET fname = ?, lname = ?, phone_number = ?, o_addr = ?, DL = ?, Adhaar_num = ? WHERE owner_email = ?`;

            const values = [fname, lname, phone, address, licenseNumber, aadhar, email];
            const [result] = await connection.execute(query, values);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found or no changes made' });
            }

            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user profile', details: error.message });
        } finally {
            await connection.end(); // Ensure connection closes properly with async/await
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
