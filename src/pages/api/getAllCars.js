import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Charizard@123',
    database: 'Car_Rental',
  });

  try {
    const [rows] = await db.query(`
      SELECT 
        model AS name,
        car_type AS category,
        kms_driven AS kms,
        overall_rating AS rating,
        price_per_day AS price,
        images AS image,
        transmission,
        passengers,
        luggage,
        reg_num as reg_num
      FROM Cars
    `);

    await db.end();

    // Modify the format of each row for compatibility with the `cars` array in TopPicks
    const carsData = rows.map(row => ({
      ...row,
      price: `${row.price}`,   // Format the price as string with '$'
      image: row.image || '/default-car.jpeg'  // Add default image if null
    }));

    res.status(200).json(carsData);
  } catch (error) {
    console.error('Database error:', error);  // Log the error details
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
