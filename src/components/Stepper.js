import React from 'react';
import styles from '../styles/Stepper.module.css';

const Stepper = ({ currentStep, onStepClick }) => {
  return (
    <div className={styles.stepperContainer}>
      <div 
        className={`${styles.step} ${currentStep >= 1 ? styles.active : ''} ${currentStep === 2 ? styles.clickable : ''}`} 
        onClick={() => currentStep === 2 && onStepClick(1)}
      >
        <span>1</span>
        <p>Personal Details</p>
      </div>
      <div className={`${styles.connector} ${currentStep >= 2 ? styles.activeConnector : ''}`} />
      <div 
        className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`} 
        onClick={() => currentStep >= 2 && onStepClick(2)}
      >
        <span>2</span>
        <p>Payment</p>
      </div>
      <div className={`${styles.connector} ${currentStep >= 3 ? styles.activeConnector : ''}`} />
      <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
        <span>3</span>
        <p>Complete</p>
      </div>
    </div>
  );
};

export default Stepper;
