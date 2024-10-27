import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Deals.module.css';
import Image from 'next/image';

const Deals = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetCount = 3469; // The target number for vehicle availability
  const countRef = useRef(null); // Reference for the vehicle count container

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visibility state to true
        } else {
          setIsVisible(false); // Set visibility state to false when out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    if (countRef.current) {
      observer.observe(countRef.current); // Observe the countRef element
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current); // Cleanup the observer on unmount
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      let increment = 1; // Default increment
      const duration = 2000; // Duration of the animation in milliseconds

      // Determine the increment based on the targetCount size
      if (targetCount >= 1000) {
        increment = Math.ceil(targetCount / 100); // Increment by 1% of the target
      } else if (targetCount >= 100) {
        increment = Math.ceil(targetCount / 50); // Increment by 2% of the target
      } else {
        increment = Math.ceil(targetCount / 10); // Increment by 10% of the target
      }

      const intervalTime = Math.ceil(duration / (targetCount / increment)); // Time per increment

      const interval = setInterval(() => {
        start += increment;
        if (start >= targetCount) {
          start = targetCount; // Ensure it doesn't exceed the target
          clearInterval(interval); // Stop the interval when the target is reached
        }
        setCount(start);
      }, intervalTime);

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    } else {
      setCount(0); // Reset count when not visible
    }
  }, [isVisible, targetCount]);

  return (
    <div className={styles.dealsContainer}>
      <h2 className={styles.dealsTitle}>
        Enjoy extra miles with our best deal
      </h2>

      <div className={styles.promotionsContainer}>
        <div className={styles.promotionCard}>
          <Image src="/promotion1.png" alt="Holiday Promotion" layout="fill" objectFit="cover" />
          <div className={styles.promotionContent}>
            <span className={styles.validDate}>Valid only from 12 Jan - 19 Jan 2024</span>
            <h3>Experience the Holidays with Our Festive Promotions</h3>
            <span className={styles.discountPercentage}>40%</span>
            <span className={styles.termsCondition}>*with Terms and Condition</span>
          </div>
        </div>

        <div className={styles.promotionCard}>
          <Image src="/promotion2.jpg" alt="Online Discount" layout="fill" objectFit="cover" />
          <div className={styles.promotionContent}>
            <span className={styles.validDate}>Valid only from 8 Jan - 22 Jan 2024</span>
            <h3>Unlock Online-Only Discounts for a Seamless Booking Experience</h3>
            <span className={styles.discountPercentage}>65%</span>
            <span className={styles.termsCondition}>*with Terms and Condition</span>
          </div>
        </div>
      </div>

      <div className={styles.vehicleInfoContainer}>
        <div className='comfort'>
        <div className={styles.comfortZone}>
          <span className={styles.donotchange}><h3>Explore more to get your comfort zone</h3>
            <p>Book your perfect stay with us.</p></span>
          <button className={styles.bookingButton}>Book Now →</button>
        </div>
        </div>

        <div className={styles.vehicleAvailable} ref={countRef}> {/* Attach ref here */}
          <Image src="/speedometer.jpeg" alt="Speedometer" layout="fill" objectFit="cover" />
          <div className={styles.vehicleOverlay}>
            <span>Vehicle Available</span>
            <span className={styles.vehicleCount}>{count.toLocaleString()}</span> {/* Animated Count */}
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
