const express = require('express');
const router = express.Router();
const db = require('G:/Projects/Drivio/backend/config/db.js'); // Ensure this points to your MySQL connection file

//Endpoint to add car
router.post('/addCarDetails', (req, res) => {
    console.log("Received request to add car condition:", req.body); // Debug: Log request data

    const { reg_num, model, price_per_day, location, engine_type, car_type, transmission } = req.body;

    // Disable foreign key checks temporarily
    db.query('SET FOREIGN_KEY_CHECKS=0', (err) => {
        if (err) {
            console.error("Error disabling foreign key checks:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const Carquery = `
        INSERT INTO Cars (reg_num, model, price_per_day, location, engine_type, car_type, transmission)
        SELECT ?, ?, ?, ?, ?, ?, ?
        WHERE ? IS NOT NULL AND ? IS NOT NULL AND ? IS NOT NULL AND ? IS NOT NULL AND ? IS NOT NULL AND ? IS NOT NULL AND ? IS NOT NULL;
    `;

        db.query(
            Carquery,
            [
                reg_num, model, price_per_day, location, engine_type, car_type, transmission
            ],
            (err, result) => {
                if (err) {
                    console.error("Error inserting car condition:", err); // Debug: Log error
                    return res.status(500).json({ error: "Database error" });
                }

                // Re-enable foreign key checks
                db.query('SET FOREIGN_KEY_CHECKS=1', (err) => {
                    if (err) {
                        console.error("Error re-enabling foreign key checks:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    console.log("Car details added successfully"); // Debug: Confirm success
                    res.status(200).json({ message: "Car details added successfully" });
                });
            }
        );
    });
});

// Endpoint to add car condition
router.post('/addCarCondition', (req, res) => {
    console.log("Received request to add car condition:", req.body); // Debug: Log request data

    const {
        reg_num, engine_condition, tire_condition, brakes_condition, battery_condition,
        fuel_level, mileage, last_service_date, insurance, battery_level, cylinder_level
    } = req.body;

    // Disable foreign key checks temporarily
    db.query('SET FOREIGN_KEY_CHECKS=0', (err) => {
        if (err) {
            console.error("Error disabling foreign key checks:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const query = `
            INSERT INTO CarCondition (reg_num, engine_condition, tire_condition, brakes_condition, battery_condition,
                fuel_level, mileage, last_service_date, insurance, battery_level, cylinder_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            query,
            [
                reg_num, engine_condition, tire_condition, brakes_condition, battery_condition,
                fuel_level, mileage, last_service_date, insurance, battery_level, cylinder_level
            ],
            (err, result) => {
                if (err) {
                    console.error("Error inserting car condition:", err); // Debug: Log error
                    return res.status(500).json({ error: "Database error" });
                }

                // Re-enable foreign key checks
                db.query('SET FOREIGN_KEY_CHECKS=1', (err) => {
                    if (err) {
                        console.error("Error re-enabling foreign key checks:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    console.log("Car condition added successfully"); // Debug: Confirm success
                    res.status(200).json({ message: "Car condition added successfully" });
                });
            }
        );
    });
});

// Endpoint to add accident history
router.post('/addAccidentHistory', (req, res) => {
    console.log("Received request to add accident history:", req.body);

    const { reg_num, acc_date, description, severity, repair_cost, status } = req.body;

    db.query('SET FOREIGN_KEY_CHECKS=0', (err) => {
        if (err) {
            console.error("Error disabling foreign key checks:", err);
            return res.status(500).json({ error: "Database error" });
        }

        const insertQuery = `
            INSERT INTO AccidentHistory (reg_num, acc_date, description, severity, repair_cost, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(insertQuery, [reg_num, acc_date, description, severity, parseFloat(repair_cost), status], (err, result) => {
            if (err) {
                console.error("Error inserting accident history:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Re-enable foreign key checks
            db.query('SET FOREIGN_KEY_CHECKS=1', (err) => {
                if (err) {
                    console.error("Error re-enabling foreign key checks:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                console.log("Accident history added successfully");
                res.status(200).json({ message: "Accident history added successfully" });
            });
        });
    });
});

module.exports = router;
