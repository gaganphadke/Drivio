const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('G:/Projects/Drivio/backend/config/db.js'); // Import your database connection

const signup = async (req, res) => {
    console.log('Signup function called'); // Check if this logs
    console.log('Request body:', req.body);
    const { fname, lname, email, password, phone_number, address } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into the database
        const query = `INSERT INTO Customers (fname, lname, customer_email, customer_h_password, phone_number, c_addr) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await db.execute(query, [fname, lname, email, hashedPassword, phone_number, address]);
        console.log('Insert result:', result); // Check result of insert

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if user exists
        const [user] = await db.execute(`SELECT * FROM Customers WHERE customer_email = ?`, [email]);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.customer_h_password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

        // Generate JWT
        const token = jwt.sign({ id: user.customer_id }, 'sup3rs3cretK3y!Th1sIsL0ngAndRand0m', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
};

module.exports = { signup, login };
