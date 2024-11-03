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
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const handlePrevious = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
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
          <input type="text" name="carModel" placeholder="Car Model" value={formData.carModel} onChange={handleChange} />
          <input type="text" name="carType" placeholder="Car Type" value={formData.carType} onChange={handleChange} />
          <input type="text" name="transmission" placeholder="Transmission" value={formData.transmission} onChange={handleChange} />
          <input type="text" name="price" placeholder="Price per day" value={formData.price} onChange={handleChange} />
        </div>
      )}
      
      {step === 2 && (
        <div className={styles.step}>
          <h3>Step 2: Car Condition</h3>
          <input type="text" name="reg_num" placeholder="Registration Number" value={formData.reg_num} onChange={handleChange} />
          <input type="text" name="engine_condition" placeholder="Engine Condition" value={formData.engine_condition} onChange={handleChange} />
          <input type="text" name="tire_condition" placeholder="Tire Condition" value={formData.tire_condition} onChange={handleChange} />
          <input type="text" name="brakes_condition" placeholder="Brakes Condition" value={formData.brakes_condition} onChange={handleChange} />
          <input type="text" name="battery_condition" placeholder="Battery Condition" value={formData.battery_condition} onChange={handleChange} />
          <input type="text" name="fuel_level" placeholder="Fuel Level" value={formData.fuel_level} onChange={handleChange} />
          <input type="text" name="mileage" placeholder="Mileage" value={formData.mileage} onChange={handleChange} />
          <input type="date" name="last_service_date" placeholder="Last Service Date" value={formData.last_service_date} onChange={handleChange} />
          <input type="text" name="insurance" placeholder="Insurance" value={formData.insurance} onChange={handleChange} />
          <input type="text" name="battery_level" placeholder="Battery Level" value={formData.battery_level} onChange={handleChange} />
          <input type="text" name="cylinder_level" placeholder="Cylinder Level" value={formData.cylinder_level} onChange={handleChange} />
        </div>
      )}
      
      {step === 3 && (
        <div className={styles.step}>
          <h3>Step 3: Accident History</h3>
          <input type="date" name="acc_date" placeholder="Accident Date" value={formData.acc_date} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input type="text" name="severity" placeholder="Severity" value={formData.severity} onChange={handleChange} />
          <input type="text" name="repair_cost" placeholder="Repair Cost" value={formData.repair_cost} onChange={handleChange} />
          <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
        </div>
      )}

      <div className={styles.navigationButtons}>
        {step > 1 && <button onClick={handlePrevious}>Previous</button>}
        {step < 3 ? <button onClick={handleNext}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default AddCar;
