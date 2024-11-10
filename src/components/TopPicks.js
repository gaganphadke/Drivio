import styles from '../styles/TopPicks.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection

const TopPicks = () => {
  const [cars, setCars] = useState([]);
  const router = useRouter(); // Initialize useRouter
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/getTopPicks');
        const data = await response.json();

        // Set the fetched car data directly
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch car data:', error);
      }
    };
    fetchCars();

    // Check if the user is logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleCarClick = (carRegNum) => {
    if (isLoggedIn) {
      // If logged in, redirect to /cars page
      router.push('/cars');
    } else {
      // If not logged in, redirect to login/signup page
      router.push('/login-signup');
    }
  };

  const handleSeeMoreClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation if not logged in
      router.push('/login-signup'); // Redirect to login/signup page
    }
  };

  return (
    <section className={styles.topPicksSection}>
      <div className={styles.heading}>
        <h2>Top picks vehicle this month</h2>
        <p>Experience the epitome of an amazing journey with our top picks.</p>
      </div>

      <div className={styles.carsGrid}>
        {cars.map((car) => (
          <div key={car.reg_num} onClick={() => handleCarClick(car.reg_num)} className={styles.carContainer}>

            {/* Car Image and Category Tag (inside the container) */}
            <div className={styles.carCard}>
              <span className={styles.categoryTag}>{car.category}</span>
              <img src={car.image} alt={car.name} className={styles.carImage} />
            </div>

            {/* Car Details (outside the container) */}
            <div className={styles.carDetailsContainer}>
              <h3 className={styles.carTitle}>{car.name}</h3>

              {/* Transmission with Gear Icon */}
              <div className={styles.transmission}>
                <Image
                  src="/gear.png"
                  alt="Transmission Gear Icon"
                  width={18}
                  height={18}
                  className={styles.icon}
                />
                <span className="trans">{car.transmission}</span>
              </div>

              <div className={styles.carDetails}>
                <span>
                  <Image
                    src="/group.png"
                    alt="Passengers"
                    width={18}
                    height={18}
                    className={styles.icon}
                  />
                  {car.passengers}
                </span>

                <span>
                  <Image
                    src="/luggage.png"
                    alt="Luggage"
                    width={18}
                    height={18}
                    className={styles.icon}
                  />
                  {car.luggage}
                </span>

                <span>
                  <Image
                    src="/star.png"
                    alt="Rating"
                    width={18}
                    height={18}
                    className={styles.icon}
                  />
                  {car.rating}
                </span>
              </div>

              <div className={styles.priceInfo}>
                <span className="startsFrom">Starts from</span>
                <span className={styles.price}>{car.price}</span>
                <span className={styles.perDay}>
                  <span className="perDay">/ day</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.seeMore}>
        <Link href="/cars" passHref>
          <div className={styles.seeMore}>
            <button onClick={handleSeeMoreClick}>See More</button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TopPicks;
