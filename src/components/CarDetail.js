import React from 'react';
import styles from '../styles/CarDetail.module.css';

const CarDetail = () => {
  return (
    <div className={styles.carDetailContainer}>
      <div className={styles.carHeader}>
        <button className={styles.backButton}>&larr;</button>
        <div className={styles.carInfo}>
          <h2>Mercedes Benz</h2>
          <span className={styles.carModel}>E-Class</span>
        </div>
        <div className={styles.moreOptions}>...</div>
      </div>
      
      <div className={styles.carImageContainer}>
        <img 
          src="/images/mercedes.png" // Example car image path
          alt="Mercedes Benz E-Class" 
          className={styles.carImage}
        />
      </div>

      <div className={styles.carSpecs}>
        <div className={styles.specItem}>
          <span>328 mi</span>
          <p>Range</p>
        </div>
        <div className={styles.specItem}>
          <span>155 mph</span>
          <p>Top Speed</p>
        </div>
        <div className={styles.specItem}>
          <span>4.4s</span>
          <p>0-60 mph</p>
        </div>
      </div>

      <div className={styles.transmission}>
        <p>Transmissions</p>
        <p>Automatic</p>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <div className={styles.statHeader}>
            <span className={styles.activityChange}>+8%</span>
            <p>Activity</p>
          </div>
          <h3>145 mph</h3>
          <p>Traveled last month</p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statHeader}>
            <p>Gas volume</p>
          </div>
          <h3>63%</h3>
          <p>I can drive 178 miles</p>
        </div>
      </div>

      <div className={styles.actionSection}>
        <button className={styles.actionButton}>Details</button>
        <button className={styles.actionButton}>Customize</button>
      </div>

      <div className={styles.bookingSection}>
        <button className={styles.bookingButton}>Booking car</button>
        <p>$750 / month</p>
      </div>
    </div>
  );
};

export default CarDetail;
