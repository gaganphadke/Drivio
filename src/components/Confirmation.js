import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Confirmation.module.css';
import { useRouter } from 'next/router';
import confetti from 'canvas-confetti';

const Confirmation = ({ userData }) => {
  const { name, email, phone } = userData;
  const [showConfetti, setShowConfetti] = useState(true); // State to control confetti display
  const router = useRouter();
  const canvasRef = useRef(null); // Create a ref for the canvas

  useEffect(() => {
    // Trigger confetti effect
    if (showConfetti) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const fireConfetti = () => {
        confetti({
          particleCount: 100, // Number of confetti pieces
          angle: 90,
          spread: 100,
          startVelocity: 30,
          decay: 0.9,
          scalar: 1,
          // You can add more customization options here
        });
      };

      fireConfetti();

      const timer = setTimeout(() => {
        setShowConfetti(false); // Hide confetti after 4 seconds
      }, 4000);

      return () => {
        clearTimeout(timer); // Clean up the timer
      };
    }
  }, [showConfetti]);

  const handleRentMoreCars = () => {
    router.push('/'); // Redirect to homepage
  };

  return (
    <div className={styles.hide}>
      {showConfetti && <canvas ref={canvasRef} className={styles.canvas} />}
      <div className={styles.confirmationContainer}>
        <h2 className={styles.confirmationTitle}>
          Your <a className={styles.green}>payment</a> has been confirmed
        </h2>
        <p className={styles.confirmationMessage}>
          Thank you for choosing DriveIO, {name}! Have a safe drive
        </p>
        <button className={styles.rentMoreButton} onClick={handleRentMoreCars}>
          Rent More Cars
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
