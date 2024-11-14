import styles from '../styles/AdminDashboard.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [carData, setCarData] = useState([]);
  const [bestCarModel, setBestCarModel] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0); // New state for total income
  const [mostPenalizedCar, setMostPenalizedCar] = useState(null); // State for most penalized car

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCarData(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBestCar = async () => {
      try {
        const response = await fetch('/api/bestCar');
        const data = await response.json();
        if (data && data.model) {
          setBestCarModel(data.model);
        } else {
          console.error("Error fetching best car:", data);
        }
      } catch (error) {
        console.error("Error fetching best car:", error);
      }
    };

    const fetchTotalIncome = async () => {
      try {
        const response = await fetch('/api/totalIncome');
        const data = await response.json();
        if (data && data.totalIncome) {
          setTotalIncome(data.totalIncome);
        } else {
          console.error("Error fetching total income:", data);
        }
      } catch (error) {
        console.error("Error fetching total income:", error);
      }
    };

    const fetchMostPenalizedCar = async () => {
      try {
        const response = await fetch('/api/mostPenalizedCar');
        const data = await response.json();
        if (data && data.model) {
          setMostPenalizedCar(data.model);
        } else {
          console.error("Error fetching most penalized car:", data);
        }
      } catch (error) {
        console.error("Error fetching most penalized car:", error);
      }
    };

    fetchData();
    fetchBestCar();
    fetchTotalIncome(); // Fetch total income on page load
    fetchMostPenalizedCar(); // Fetch the most penalized car on page load
  }, []);


  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <div className='left'>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <h2>ABOUT CAR</h2>
            <ul>
              <div className='active'>
                <li className={`${styles.sidebarItem} ${styles.active}`}>
                  <Image src="/dashboard.png" alt="Dashboard Icon" width={24} height={24} className={styles.icon} />
                  Dashboard
                </li>
              </div>
              <li className={styles.sidebarItem}>
                <Image src="/discover.png" alt="Discover Icon" width={24} height={24} className={styles.icon} />
                Discover
              </li>
              <li className={styles.sidebarItem}>
                <Image src="/calendar.png" alt="Calendar Icon" width={24} height={24} className={styles.icon} />
                Calendar
              </li>
              <li className={styles.sidebarItem}>
                <Image src="/saved.png" alt="Saved Icon" width={24} height={24} className={styles.icon} />
                Saved
              </li>
              <li className={styles.sidebarItem}>
                <Image src="/inbox.png" alt="Inbox Icon" width={24} height={24} className={styles.icon} />
                Inbox
              </li>
            </ul>
          </div>

          <div className={styles.sidebarBottom}>
            <h3>REPORT</h3>
            <ul>
              <li className={styles.sidebarItem}>
                <Image src="/transaction.png" alt="Transactions Icon" width={24} height={24} className={styles.icon} />
                Transactions
              </li>
              <li className={styles.sidebarItem}>
                <Image src="/report.png" alt="Car Reports Icon" width={24} height={24} className={styles.icon} />
                Car Reports
              </li>
            </ul>
          </div>
          <div className='settings'>
            <div className={styles.settingsBtn}>
              <button className={styles.settings}>
                <Image src="/settings.png" alt="Settings Icon" width={30} height={30} />
                Settings
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className='mainC'>
        <main className={styles.mainContent}>
          {/* Header Section */}
          <div className='header'>
            <header className={styles.header}>
              <div className={styles.headerContent}>
                <h1>Get where you need to go with our service</h1>
                <p>Budget-friendly car rentals for road trips, city visits, and more.</p>
                <button className={styles.exploreButton}>Start Exploring</button>
              </div>
              <Image src="/exploring.jpg" className={styles.exploring} width={400} height={320} />
            </header>
          </div>

          {/* Car Listings Section */}
          <div className='carListings'>
            <section className={styles.carListings}>
              <h2>Car Listings</h2>
              <table className={styles.listingTable}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Client Name</th>
                    <th>Car Type</th>
                    <th>Car Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {carData.map((car, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{car.clientName}</td>
                      <td className={car.carType === "N/A" ? styles.naText : ''}>{car.carType}</td>
                      <td className={car.carNumber === "N/A" ? styles.naText : ''}>{car.carNumber}</td>
                      <td>
                        <div className={
                          car.status === "On Going"
                            ? styles.ongoing
                            : car.status === "Finished"
                              ? styles.finished
                              : styles.canceled
                        }>
                          {car.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </main>
      </div>

      {/* Right Sidebar (User Profile + Metrics) */}
      <div className='full'>
        <aside className={styles.rightSidebar}>
          {/* Profile Section */}
          <div className='right'>
            <div className={styles.profileCard}>
              <img src="/profile.png" alt="User Profile" className={styles.profileImage} />
              <h3>Gagan</h3>
              <p>admin@gmail.com</p>
              <button className={styles.editButton}><span>Edit Profile</span></button>
            </div>
          </div>

          {/* Metrics Section */}

          <div className={styles.metrics}>
            <div className='right'>
              <div className={styles.metricCard}>
                <div className={styles.metricText}>
                  <h3>Best Car</h3>
                  <p>{bestCarModel}</p>
                  {/* <span><a className={styles.turnover}>+45</a> from last month</span> */}
                </div>
                <img src="/turnover.png" alt="Turnover Icon" className={styles.metricImage} />
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricText}>
                  <h3>Income</h3>
                  <p>${totalIncome}</p>
                  <span><a className={styles.income}>+72</a> from last month</span>
                </div>
                <img src="/income.png" alt="Income Icon" className={styles.metricImage} />
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricText}>
                  <h3>Top Penalized</h3>
                  <p>{mostPenalizedCar}</p>
                </div>
                <img src="/outcome.png" alt="Outcome Icon" className={styles.metricImage} />
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default AdminDashboard;
