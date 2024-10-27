import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/CarDetail.module.css';
import CircularProgress from './CircularProgress';

const CarDetail = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.carDetailContainer}>
      <div className={styles.carHeader}>
        <button className={styles.backButton} onClick={handleBackClick}>
          &larr;
        </button>
        <div className={styles.carInfo}>
          <h2>BMW</h2>
          <span className={styles.carModel}>M2</span>
        </div>
        <div className={styles.moreOptions}></div>
      </div>

      <div className={styles.carImageContainer}>
        <img src="/bmw-m2-side.png" alt="BMW M2" className={styles.carImage} />
      </div>

      {/* New Specifications Section */}
      <div className={styles.specsContainer}>
        <img src='/bmw-logo.png' className={styles.logo} />

        {/* New container for images above specs */}
        <div className={styles.imageContainer}>
          <img src='/range.png' alt='Range Image' className={styles.specImage} />
          <img src='/speed.png' alt='Top Speed Image' className={styles.specImage} />
          <img src='/time-car.png' alt='0-60 Image' className={styles.specImage} />
        </div>

        <div className={styles.specifications}>
          <div className={styles.specItem}>
            <span>328 km</span>
            <p>Range</p>
          </div>
          <div className={styles.specItem}>
            <span>250 kmph</span>
            <p>Top Speed</p>
          </div>
          <div className={styles.specItem}>
            <span>2.1s</span>
            <p>0-60 kmph</p>
          </div>
        </div>

        {/* Transmission section below specifications */}
        <div className={styles.transmissionContainer}>
          <p className={styles.transmissionLabel}>Transmissions</p>
          <p className={styles.transmissionValue}>
            Automatic
            <img src='/transmission.png' alt='Transmission Image' className={styles.transmissionImage} />
          </p>
        </div>
      </div>



      {/* Activity and Gas Volume */}
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <h4 className={styles.act}>Activity</h4>
          <div className={styles.green}><span className={styles.activityChange}>+8%</span></div>
          <h3>145 mph</h3>
          <p>Traveled last month</p>
        </div>
        <div className={styles.statItem2}>
          <CircularProgress percentage={69} miles={178} />
        </div>
      </div>

      <div className={styles.bookingSection}>
        <a className={styles.bookingButton}>Book car</a>
        <p>$60 / day</p>
      </div>
    </div>
  );
};

export default CarDetail;
