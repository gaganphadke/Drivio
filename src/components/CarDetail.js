// CarDetail.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CarDetail.module.css';
import CircularProgress from './CircularProgress';

const CarDetail = () => {
  const router = useRouter();
  const { reg_num } = router.query;
  const [car, setCar] = useState(null);
  const [conditions, setConditions] = useState({});
  const [error, setError] = useState(null);
  const [formInputs, setFormInputs] = useState({
    departure: '',
    returnLocation: '',
    pickUpDate: '',
    pickUpTime: '',
    returnDate: '',
    returnTime: '',
    driverOption: null,
  });

  useEffect(() => {
    if (reg_num) {
      fetch(`/api/getCarDetails?reg_num=${reg_num}`)
        .then((res) => {
          if (!res.ok) throw new Error('Car not found');
          return res.json();
        })
        .then((data) => {
          setCar(data.car);
          setConditions(data.conditions);
        })
        .catch((error) => {
          console.error('Failed to fetch car data:', error);
          setError(error.message);
        });
    }
  }, [reg_num]);

  useEffect(() => {
    if (router.query) {
      const { departure, returnLocation, pickUpDate, pickUpTime, returnDate, returnTime, driverOption } = router.query;
      setFormInputs({
        departure: departure || '',
        returnLocation: returnLocation || '',
        pickUpDate: pickUpDate || '',
        pickUpTime: pickUpTime || '',
        returnDate: returnDate || '',
        returnTime: returnTime || '',
        driverOption: driverOption || null,
      });
    }
  }, [router.query]);

  if (error) return <p>{error}</p>;
  if (!car) return <p>Loading...</p>;

  const nonNullConditions = Object.entries(conditions).filter(([, value]) => value !== null);

  const handleBackButtonClick = () => {
    router.push({
      pathname: '/cars',  // Redirect back to /cars
      query: {
        reg_num,
        ...formInputs,  // Pass the form inputs back as query params
      },
    });
  };

  const handleBookingClick = () => {
    router.push({
      pathname: '/payment',  // Redirect to /payment page
      query: {
        reg_num,
        ...formInputs,  // Pass form inputs as query params
      },
    });
  };


  return (
    <div className={styles.carDetailContainer}>
      <div className={styles.carHeader}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          &larr;
        </button>
        <div className={styles.carInfo}>
          <h2>{car.brand}</h2>
          <span className={styles.carModel}>{car.model}</span>
        </div>
        <div className={styles.moreOptions}></div>
      </div>

      <div className={styles.carImageContainer}>
        <img src={car.side} alt={`${car.brand} ${car.model}`} className={styles.carImage} />
      </div>

      <div className={styles.specsContainer}>
        <img src={car.logo} className={styles.logo} alt={`${car.brand} logo`} />

        <div className={styles.imageContainer}>
          <img src='/range.png' alt='Range Image' className={styles.specImage} />
          <img src='/speed.png' alt='Top Speed Image' className={styles.specImage} />
          <img src='/time-car.png' alt='0-60 Image' className={styles.specImage} />
        </div>

        <div className={styles.specifications}>
          <div className={styles.specItem}>
            <span>{car.range_km} km</span>
            <p>Range</p>
          </div>
          <div className={styles.specItem}>
            <span>{car.top_speed} kmph</span>
            <p>Top Speed</p>
          </div>
          <div className={styles.specItem}>
            <span>{car.pickup} s</span>
            <p>0-60 kmph</p>
          </div>
        </div>

        <div className={styles.transmissionContainer}>
          <p className={styles.transmissionLabel}>Transmissions</p>
          <p className={styles.transmissionValue}>
            {car.transmission || 'Automatic'}
            <img src='/transmission.png' alt='Transmission Image' className={styles.transmissionImage} />
          </p>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <h4 className={styles.act}>Activity</h4>
          <div className={styles.green}><span className={styles.activityChange}>+{car.activity}%</span></div>
          <h3>{car.travel_m} kms</h3>
          <p>Traveled last month</p>
        </div>
        <div className={styles.statItem2}>
          <CircularProgress percentage={car.rem_range} miles={car.rem_range_dist} />
        </div>
      </div>

      {/* Dropdown for non-null car conditions */}
      <div className={styles.conditionsDropdown}>
        <label htmlFor="carConditions">Car Conditions:</label>
        <select id="carConditions" className={styles.dropdown} defaultValue="">
          <option value="" disabled className={styles.disabled}>
            Click to view car conditions
          </option>
          {nonNullConditions.map(([key, value]) => (
            <option key={key} value={key} disabled>
              {key.replace('_', ' ')}: {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.bookingSection} onClick={handleBookingClick}>
        <button className={styles.bookingButton} ><span>Book car</span></button>
        <p>${car.price_per_day} / day</p>
      </div>
    </div>
  );
};

export default CarDetail;
