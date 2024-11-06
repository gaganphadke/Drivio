import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const  {reg_num}  = req.query;  // Extract reg_num from query parameters
  console.log(reg_num)
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Charizard@123',
    database: 'Car_Rental',
  });

  try {
    const [rows] = await db.query(`
      SELECT 
        Cars.reg_num,
        details.model,
        Cars.car_type,
        Cars.kms_driven,
        Cars.overall_rating,
        Cars.price_per_day,
        details.side,
        Cars.transmission,
        Cars.passengers,
        Cars.luggage,
        details.logo,
        details.range_km,
        details.top_speed,
        details.pickup,
        details.brand,
        details.rem_range,
        details.activity,
        details.travel_m,
        details.rem_range_dist
      FROM Cars
      JOIN details ON Cars.reg_num = details.reg_num
      WHERE Cars.reg_num = ?
    `, [reg_num]);

    await db.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const carDetails = rows[0];  // Get the first (and only) result
    res.status(200).json(carDetails);
  } catch (error) {
    console.error('Database error:', error);  // Log the error details
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
}
