import { useState } from 'react';
import styles from '../styles/AddCar.module.css';

const AddCar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Car Details
    carModel: '',
    carType: '',
    transmission: '',
    price: '',
    location: '',
    engineType: '',

    // Step 2 - Car Condition
    reg_num: '',
    engine_condition: '',
    tire_condition: '',
    brakes_condition: '',
    battery_condition: '',
    fuel_level: '',
    mileage: '',
    last_service_date: '',
    insurance: '',
    battery_level: '',
    cylinder_level: '',

    // Step 3 - Accident History
    acc_date: '',
    description: '',
    severity: '',
    repair_cost: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNext = async () => {
    if (step === 1) {
      // Send Car Condition data to backend before moving to step 3
      try {
        const response = await fetch('http://localhost:5001/api1/addCarDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reg_num: formData.reg_num,
            model: formData.carModel,
            price_per_day: formData.price,
            location: formData.location,
            engine_type: formData.engineType,
            car_type: formData.carType,
            transmission: formData.transmission
          })
        });
        const result = await response.json();
        console.log(result.message);
        if (response.ok) {
          alert('Car details added successfully!');
          setStep(2); // Move to the next step if submission was successful
        } else {
          alert('Failed to add car condition.');
        }
      } catch (error) {
        console.error('Error adding car details:', error);
      }
    }
    else if (step === 2) {
      // Send Car Condition data to backend before moving to step 3
      try {
        const response = await fetch('http://localhost:5001/api1/addCarCondition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reg_num: formData.reg_num,
            engine_condition: formData.engine_condition,
            tire_condition: formData.tire_condition,
            brakes_condition: formData.brakes_condition,
            battery_condition: formData.battery_condition,
            fuel_level: formData.fuel_level,
            mileage: formData.mileage,
            last_service_date: formData.last_service_date,
            insurance: formData.insurance,
            battery_level: formData.battery_level,
            cylinder_level: formData.cylinder_level
          })
        });
        const result = await response.json();
        console.log(result.message);
        if (response.ok) {
          alert('Car condition added successfully!');
          setStep(3); // Move to the next step if submission was successful
        } else {
          alert('Failed to add car condition.');
        }
      } catch (error) {
        console.error('Error adding car condition:', error);
      }
    }
    else {
      setStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const handlePrevious = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const handleSubmit = async () => {
    if (step === 3) {
      // Submit Accident History data to the backend
      try {
        const response = await fetch('http://localhost:5001/api1/addAccidentHistory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reg_num: formData.reg_num,
            acc_date: formData.acc_date,
            description: formData.description,
            severity: formData.severity,
            repair_cost: formData.repair_cost,
            status: formData.status
          })
        });
        const result = await response.json();
        console.log(result.message);
        if (response.ok) {
          alert('Accident history added successfully!');
        } else {
          alert('Failed to add accident history.');
        }
      } catch (error) {
        console.error('Error adding accident history:', error);
      }
    } else {
      console.log('All steps completed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add a New Car</h2>
      <div className={styles.progress}>
        <div style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      {step === 1 && (
        <div className={styles.step}>
          <h3>Step 1: Car Details</h3>
          <input type="text" name="carModel" placeholder="Car Model" value={formData.carModel} onChange={handleChange} required />
          <input type="text" name="carType" placeholder="Car Type" value={formData.carType} onChange={handleChange} required />
          <input type="text" name="transmission" placeholder="Transmission" value={formData.transmission} onChange={handleChange} required />
          <input type="text" name="price" placeholder="Price per day" value={formData.price} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Add Location" value={formData.location} onChange={handleChange} required />
          <input type="text" name="engineType" placeholder="Enter Engine Type" value={formData.engineType} onChange={handleChange} required />
          <input type="text" name="reg_num" placeholder="Registration Number" value={formData.reg_num} onChange={handleChange} required />
        </div>
      )}

      {step === 2 && (
        <div className={styles.step}>
          <h3>Step 2: Car Condition</h3>

          <input type="text" name="engine_condition" placeholder="Engine Condition" value={formData.engine_condition} onChange={handleChange} required />
          <input type="text" name="tire_condition" placeholder="Tire Condition" value={formData.tire_condition} onChange={handleChange} required />
          <input type="text" name="brakes_condition" placeholder="Brakes Condition" value={formData.brakes_condition} onChange={handleChange} required />
          <input type="text" name="battery_condition" placeholder="Battery Condition" value={formData.battery_condition} onChange={handleChange} required />
          <input type="text" name="fuel_level" placeholder="Fuel Level" value={formData.fuel_level} onChange={handleChange} required />
          <input type="text" name="mileage" placeholder="Mileage" value={formData.mileage} onChange={handleChange} required />
          <input type="date" name="last_service_date" placeholder="Last Service Date" value={formData.last_service_date} onChange={handleChange} required />
          <input type="text" name="insurance" placeholder="Insurance" value={formData.insurance} onChange={handleChange} required />
          <input type="text" name="battery_level" placeholder="Battery Level" value={formData.battery_level} onChange={handleChange} required />
          <input type="text" name="cylinder_level" placeholder="Cylinder Level" value={formData.cylinder_level} onChange={handleChange} required />
        </div>
      )}

      {step === 3 && (
        <div className={styles.step}>
          <h3>Step 3: Accident History</h3>
          <input type="date" name="acc_date" placeholder="Accident Date" value={formData.acc_date} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="text" name="severity" placeholder="Severity" value={formData.severity} onChange={handleChange} required />
          <input type="text" name="repair_cost" placeholder="Repair Cost" value={formData.repair_cost} onChange={handleChange} required />
          <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
        </div>
      )}

      <div className={styles.navigationButtons}>
        {step > 1 && <button onClick={handlePrevious}>Previous</button>}
        {step < 3 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default AddCar;