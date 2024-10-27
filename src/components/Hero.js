import React, { useState } from 'react';
import styles from '../styles/Hero.module.css';
import Image from 'next/image';

const Hero = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    if (selectedButton === buttonName) {
      setSelectedButton(null); // Deselect if already selected
    } else {
      setSelectedButton(buttonName); // Select the button
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <h1>Rent a Car for Every Journey</h1>
        <div className='form-1'>
          <form
            className={styles.searchForm}
            style={{
              width: '120%', // Keep the form full width
              margin: '0 auto', // Center the form
              transition: 'width 0.7s ease', // Smooth transition
              display: 'flex', // Ensure it uses flexbox for alignment
              flexWrap: 'wrap', // Allow wrapping of input groups
              gap: '10px', // Space between input groups
            }}
          >
            <div className={styles.inputGroup}>
              <label>Departure</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/location.png"
                  alt="Location Icon"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input type="text" placeholder="Enter Location" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Return Location</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/location.png"
                  alt="Location Icon"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input type="text" placeholder="Enter Location" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Pick Up Date</label>
              <input className='logo' type="date" />
            </div>
            <div className={styles.inputGroup}>
              <label>Pick Up Time</label>
              <input className='logo' type="time" />
            </div>
            <div className={styles.inputGroup}>
              <label>Return Date</label>
              <input className='logo' type="date" />
            </div>
            <div className={styles.inputGroup}>
              <label>Return Time</label>
              <input className='logo' type="time" />
            </div>
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
      </div>
    </section>
  );
};

export default Hero;
