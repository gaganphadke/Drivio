import React from 'react';
import styles from '../styles/Deals.module.css';
import Image from 'next/image';

const Deals = () => {
  return (
    <div className={styles.dealsContainer}>
      <h2 className={styles.dealsTitle}>Enjoy extra miles with our best deal <span className={styles.seeAll}>See All →</span></h2>
      
      <div className={styles.promotionsContainer}>
        <div className={styles.promotionCard}>
          <Image src="/promotion1.png" alt="Holiday Promotion" layout="fill" objectFit="cover" />
          <div className={styles.promotionContent}>
            <span className={styles.validDate}>Valid only on 12 Jan - 19 Jan 2024</span>
            <h3>Experience the Holidays with Our Festive Promotions</h3>
            <span className={styles.discountPercentage}>40%</span>
            <span className={styles.termsCondition}>*with Terms and Condition</span>
          </div>
        </div>
        
        <div className={styles.promotionCard}>
          <Image src="/promotion2.jpg" alt="Online Discount" layout="fill" objectFit="cover" />
          <div className={styles.promotionContent}>
            <span className={styles.validDate}>Valid only on 8 Jan - 22 Jan 2024</span>
            <h3>Unlock Online-Only Discounts for a Seamless Booking Experience</h3>
            <span className={styles.discountPercentage}>65%</span>
            <span className={styles.termsCondition}>*with Terms and Condition</span>
          </div>
        </div>
      </div>

      <div className={styles.vehicleInfoContainer}>
        <div className={styles.comfortZone}>
          <h3>Explore more to get your comfort zone</h3>
          <p>Book your perfect stay with us.</p>
          <button className={styles.bookingButton}>Booking Now →</button>
        </div>
        
        <div className={styles.vehicleAvailable}>
          <Image src="/speedometer.jpeg" alt="Speedometer" layout="fill" objectFit="cover" />
          <div className={styles.vehicleOverlay}>
            <span>Vehicle Available</span>
            <span className={styles.vehicleCount}>3,490</span>
          </div>
        </div>
        
        <div className={styles.memories}>
          <Image src="/audi.jpg" alt="Audi" layout="fill" objectFit="cover" />
          <div className={styles.memoriesOverlay}>
            <h3>Beyond accommodation, creating memories of a lifetime</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;