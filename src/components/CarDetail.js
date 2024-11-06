// CarDetail.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CarDetail.module.css';
import CircularProgress from './CircularProgress';

const CarDetail = () => {
  const router = useRouter();
  const { reg_num } = router.query; // Access `reg_num` from the query
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (reg_num) {
      fetch(`/api/getCarDetails?reg_num=${reg_num}`)
        .then((res) => {
          if (!res.ok) throw new Error('Car not found');
          return res.json();
        })
        .then((data) => setCar(data))
        .catch((error) => {
          console.error('Failed to fetch car data:', error);
          setError(error.message);
        });
    }
  }, [reg_num]);

  if (error) return <p>{error}</p>;
  if (!car) return <p>Loading...</p>;

  return (
    <div className={styles.carDetailContainer}>
      <div className={styles.carHeader}>
        <button className={styles.backButton} onClick={() => router.back()}>
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

      {/* New Specifications Section */}
      <div className={styles.specsContainer}>
        <img src={car.logo} className={styles.logo} alt={`${car.brand} logo`} />

        {/* New container for images above specs */}
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

        {/* Transmission section below specifications */}
        <div className={styles.transmissionContainer}>
          <p className={styles.transmissionLabel}>Transmissions</p>
          <p className={styles.transmissionValue}>
            {car.transmission || 'Automatic'} {/* Assuming `car.transmission` is available */}
            <img src='/transmission.png' alt='Transmission Image' className={styles.transmissionImage} />
          </p>
        </div>
      </div>

      {/* Activity and Gas Volume */}
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <h4 className={styles.act}>Activity</h4>
          <div className={styles.green}><span className={styles.activityChange}>+{car.activity}%</span></div>
          <h3>{car.travel_m} kms</h3> {/* Assuming a default value */}
          <p>Traveled last month</p>
        </div>
        <div className={styles.statItem2}>
          <CircularProgress percentage={car.rem_range} miles={car.rem_range_dist} />
        </div>
      </div>

      <div className={styles.bookingSection}>
        <button className={styles.bookingButton}>Book car</button>
        <p>${car.price_per_day} / day</p>
      </div>
    </div>
  );
};

export default CarDetail;
