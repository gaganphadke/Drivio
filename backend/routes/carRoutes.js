const express = require('express');
const router = express.Router();
const db = require('G:/Projects/Drivio/backend/config/db.js'); // Ensure this points to your MySQL connection file

// Helper function to execute a query with foreign key checks
const withForeignKeyChecks = async (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query('SET FOREIGN_KEY_CHECKS=0', (disableErr) => {
            if (disableErr) return reject(disableErr);

            db.query(query, params, (err, result) => {
                if (err) return reject(err);

                db.query('SET FOREIGN_KEY_CHECKS=1', (enableErr) => {
                    if (enableErr) return reject(enableErr);
                    resolve(result);
                });
            });
        });
    });
};

// Endpoint to add car details
router.post('/addCarDetails', async (req, res) => {
    const { reg_num, model, price_per_day, location, engine_type, car_type, transmission, passengers, kms_driven, luggage, email } = req.body;

    if (!reg_num || !model || !price_per_day || !location || !engine_type || !car_type || !transmission || !passengers || !kms_driven || !luggage || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Retrieve the owner_id based on the email from the Owners table
        const ownerQuery = `SELECT owner_id FROM Owners WHERE owner_email = ?`;
        const [ownerResult] = await db.promise().query(ownerQuery, [email]);

        if (ownerResult.length === 0) {
            return res.status(404).json({ error: "Owner not found with the given email" });
        }

        const owner_id = ownerResult[0].owner_id;

        // Insert car details with the owner_id
        const CarQuery = `
            INSERT INTO Cars (reg_num, model, price_per_day, location, engine_type, car_type, transmission, passengers, kms_driven, luggage, owner_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await withForeignKeyChecks(CarQuery, [reg_num, model, price_per_day, location, engine_type, car_type, transmission, passengers, kms_driven, luggage, owner_id]);
        console.log("Car details added successfully");
        res.status(200).json({ message: "Car details added successfully" });
    } catch (error) {
        console.error("Error inserting car details:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Endpoint to add car condition
router.post('/addCarCondition', async (req, res) => {
    const { reg_num, engine_condition, tire_condition, brakes_condition, battery_condition,
        fuel_level, mileage, last_service_date, insurance, battery_level, cylinder_level } = req.body;

    if (!reg_num || !engine_condition || !tire_condition || !brakes_condition || !battery_condition ||
        !fuel_level || !mileage || !last_service_date || !insurance || !battery_level || !cylinder_level) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const CarConditionQuery = `
            INSERT INTO CarCondition (reg_num, engine_condition, tire_condition, brakes_condition, battery_condition,
                fuel_level, mileage, last_service_date, insurance, battery_level, cylinder_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await withForeignKeyChecks(CarConditionQuery, [reg_num, engine_condition, tire_condition, brakes_condition, battery_condition,
            fuel_level, mileage, last_service_date, insurance, battery_level, cylinder_level]);
        console.log("Car condition added successfully");
        res.status(200).json({ message: "Car condition added successfully" });
    } catch (error) {
        console.error("Error inserting car condition:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Endpoint to add accident history
router.post('/addAccidentHistory', async (req, res) => {
    const { reg_num, acc_date, description, severity, repair_cost, status } = req.body;

    if (!reg_num || !acc_date || !description || !severity || !repair_cost || !status) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const AccidentHistoryQuery = `
            INSERT INTO AccidentHistory (reg_num, acc_date, description, severity, repair_cost, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await withForeignKeyChecks(AccidentHistoryQuery, [reg_num, acc_date, description, severity, parseFloat(repair_cost), status]);
        console.log("Accident history added successfully");
        res.status(200).json({ message: "Accident history added successfully" });
    } catch (error) {
        console.error("Error inserting accident history:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
