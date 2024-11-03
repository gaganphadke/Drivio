const admin = require('firebase-admin');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change this to your MySQL username
  password: 'Gagan@1732004', // Change this to your MySQL password
  database: 'CarRentalDB', // Use your existing database name
});

// Function to extract name from email
const extractNameFromEmail = (email) => {
  const name = email.split('@')[0];
  const [fname, lname] = name.split('.'); // Assuming name is in the format "first.last"
  return {
    fname: fname.charAt(0).toUpperCase() + fname.slice(1), // Capitalize first letter of first name
    lname: lname ? lname.charAt(0).toUpperCase() + lname.slice(1) : '', // Capitalize last name if exists
  };
};

// Function to fetch users from Firebase and store them in MySQL
const migrateUsers = async () => {
  try {
    // Fetch users from Firebase Auth
    const users = await admin.auth().listUsers();
    
    for (const user of users.users) {
      const { email } = user;
      const passwordHash = user.passwordHash || 'defaultPassword'; // Use a default password if hash is unavailable

      // Extract names from email
      const { fname, lname } = extractNameFromEmail(email);

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(passwordHash, 10);

      // Insert user data into MySQL
      connection.query(
        'INSERT INTO Customers (fname, lname, customer_email, customer_h_password) VALUES (?, ?, ?, ?)',
        [fname, lname, email, hashedPassword],
        (error, results) => {
          if (error) {
            console.error('Error inserting user:', error);
          } else {
            console.log('User added:', results.insertId);
          }
        }
      );
    }

    console.log('Migration completed.');
  } catch (error) {
    console.error('Error fetching users from Firebase:', error);
  } finally {
    connection.end();
  }
};

migrateUsers();
