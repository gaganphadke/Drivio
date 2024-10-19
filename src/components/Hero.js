import React, { useState } from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null); // State for selected button

  const toggleRoundTrip = () => {
    setIsRoundTrip((prev) => !prev);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName); // Update selected button state
  };

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <h1>Rent a Car for Every Journey</h1>
        <form className={styles.searchForm}>
          <div className={styles.inputGroup}>
            <label>Departure</label>
            <input type="text" placeholder="City, airport or station" />
            <div className={styles.toggleContainer}>
              <label>
                Round Trip?
                <input 
                  type="checkbox" 
                  checked={isRoundTrip} 
                  onChange={toggleRoundTrip} 
                />
                <span className={styles.toggleSwitch}></span>
              </label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Return Location</label>
            <input type="text" placeholder="City, airport or station" />
          </div>
          <div className={styles.inputGroup}>
            <label>Pick Up Date</label>
            <input type="date" />
          </div>
          <div className={styles.inputGroup}>
            <label>Pick Up Time</label>
            <input type="time" />
          </div>
          {isRoundTrip && (
            <>
              <div className={styles.inputGroup}>
                <label>Return Date</label>
                <input type="date" />
              </div>
              <div className={styles.inputGroup}>
                <label>Return Time</label>
                <input type="time" />
              </div>
            </>
          )}
          {/* Wrap filter buttons and search button in a flex container */}
          <div className={styles.actionGroup}>
            <div className={styles.filterGroup}>
              <p style={{ marginRight: '10px' }}>Filter:</p>
              <button
                type="button"
                className={`${styles.filterButton} ${selectedButton === 'Without Driver' ? styles.selected : ''}`}
                onClick={() => handleButtonClick('Without Driver')}
              >
                Without Driver
              </button>
              <button
                type="button"
                className={`${styles.filterButton} ${selectedButton === 'With Driver' ? styles.selected : ''}`}
                onClick={() => handleButtonClick('With Driver')}
              >
                With Driver
              </button>
            </div>
            <div className={styles.searchButtonContainer}>
              <button type="submit" className={styles.searchButton}>
                Search →
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
