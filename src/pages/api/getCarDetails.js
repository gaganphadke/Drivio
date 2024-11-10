// getCarDetails.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { reg_num } = req.query;
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Charizard@123',
    database: 'Car_Rental',
  });

  try {
    const [carRows] = await db.query(`
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

    const [conditionRows] = await db.query(`
      SELECT 
        engine_condition,
        tire_condition,
        brakes_condition,
        battery_condition,
        fuel_level,
        mileage,
        DATE_FORMAT(last_service_date, '%Y-%m-%d') AS last_service_date,
        insurance,
        battery_level,
        cylinder_level
      FROM CarCondition
      WHERE reg_num = ?
    `, [reg_num]);

    await db.end();

    if (carRows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const carDetails = carRows[0];
    const carConditions = conditionRows[0] || {};

    res.status(200).json({ car: carDetails, conditions: carConditions });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch car details' });
  }
}
