import mysql from 'mysql2';

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your DB host
  user: 'root',  // Replace with your DB user
  password: 'Charizard@123',  // Replace with your DB password
  database: 'Car_Rental',  // Replace with your DB name
});

export default async function handler(req, res) {
  const { reg_num } = req.query;

  if (!reg_num) {
    return res.status(400).json({ message: "Registration number is required" });
  }

  try {
    const query = `
      SELECT reg_num, model, price_per_day, location, status, images, kms_driven, condition_id, engine_type, 
             car_type, transmission, overall_rating, passengers, luggage, owner_id
      FROM Cars 
      WHERE reg_num = ?
    `;
    
    // Execute the query to get car details
    const [carDetails] = await connection.promise().execute(query, [reg_num]);

    if (carDetails.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Mapping the response to match the frontend structure
    const car = carDetails[0];
    const transformedCarDetails = {
      id: car.reg_num,  // Using reg_num as id
      category: car.car_type,  // Assuming car_type is the category
      name: car.model,  // Model is used as the car name
      transmission: car.transmission,
      passengers: car.passengers,
      luggage: car.luggage,
      rating: car.overall_rating,
      price: car.price_per_day,
      image: car.images,
      owner_id: car.owner_id,  // Include owner_id in the response
    };

    // Return the transformed car details with owner_id
    return res.status(200).json(transformedCarDetails);
    
  } catch (error) {
    return res.status(500).json({ message: "Error fetching car details", error });
  }
}
