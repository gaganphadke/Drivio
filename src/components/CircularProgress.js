import React, { useEffect, useState } from 'react';
import styles from '../styles/CircularProgress.module.css';

const CircularProgress = ({ percentage, miles }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    setStrokeDashoffset(circumference - (percentage / 100) * circumference);
  }, [circumference, percentage]);

  return (
    <div className={styles.statItem}>
      <h4 className={styles.title}>Remaining range</h4>
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        className={styles.progressCircle}
      >
        <circle
          cx="35"
          cy="35"
          r={radius}
          strokeWidth="3"
          className={styles.circleBackground}
        />
        <circle
          cx="35"
          cy="35"
          r={radius}
          strokeWidth="3"
          className={styles.circleProgress}
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
      </svg>
      <h3 className={styles.percen}>{percentage}%</h3>
      <p className={styles.can}>Can drive {miles} kms</p>
    </div>
  );
};

export default CircularProgress;
