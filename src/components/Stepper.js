// components/Stepper.js

import React from 'react';
import styles from '../styles/Stepper.module.css';

const Stepper = ({ currentStep }) => {
  return (
    <div className={styles.stepperContainer}>
      <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
        <span>1</span>
        <p>Personal Details</p>
      </div>
      <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
        <span>2</span>
        <p>Payment</p>
      </div>
      <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
        <span>3</span>
        <p>Complete</p>
      </div>
    </div>
  );
};

export default Stepper;
