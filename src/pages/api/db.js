// /api/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',    // your database host
  user: 'root',         // your database username
  password: 'Charizard@123',         // your database password
  database: 'Car_Rental', // your database name
});

export default pool;
