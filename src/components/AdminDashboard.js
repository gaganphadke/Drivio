import styles from '../styles/AdminDashboard.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';


// const carData = [
//   { clientName: 'Liam Johnson', carType: 'Honda Brio', carNumber: '010 MOR', status: 'On Going' },
//   { clientName: 'Noah Anderson', carType: 'Pajero Sport', carNumber: '696 TON', status: 'Finished' },
//   { clientName: 'Ethan Smith', carType: 'Agya', carNumber: '665 KIT', status: 'Finished' },
//   { clientName: 'Mason Davis', carType: 'N/A', carNumber: 'N/A', status: 'Canceled' },
//   { clientName: 'Isabella Martinez', carType: 'Hyundai Elantra', carNumber: '234 DEF', status: 'Finished' },
//   { clientName: 'Olivia Garcia', carType: 'Nissan Altima', carNumber: '345 GHI', status: 'On Going' },
//   { clientName: 'James Wilson', carType: 'Ford Mustang', carNumber: '456 JKL', status: 'Finished' },
//   { clientName: 'Ava Rodriguez', carType: 'Chevrolet Malibu', carNumber: '567 MNO', status: 'Canceled' },
//   { clientName: 'Sophia Brown', carType: 'Kia Soul', carNumber: '678 PQR', status: 'Finished' },
//   { clientName: 'Benjamin Taylor', carType: 'Volkswagen Jetta', carNumber: '789 STU', status: 'On Going' },
//   { clientName: 'Lucas Martinez', carType: 'Mazda CX-5', carNumber: '890 VWX', status: 'Finished' },
//   { clientName: 'Amelia Hernandez', carType: 'Subaru Forester', carNumber: '901 YZA', status: 'On Going' },
//   { clientName: 'Elijah Lee', carType: 'Honda Accord', carNumber: '012 BCD', status: 'Finished' },
//   { clientName: 'Charlotte White', carType: 'Ford Explorer', carNumber: '123 EFG', status: 'Canceled' },
//   { clientName: 'Harper Scott', carType: 'Chevrolet Tahoe', carNumber: '234 HIJ', status: 'Finished' },
//   { clientName: 'Henry Kim', carType: 'Nissan Sentra', carNumber: '345 KLM', status: 'On Going' },
//   { clientName: 'Mia Young', carType: 'Kia Sorento', carNumber: '456 NOP', status: 'Finished' },
//   { clientName: 'Aiden Clark', carType: 'N/A', carNumber: 'N/A', status: 'Canceled' },
//   { clientName: 'Scarlett Lewis', carType: 'Toyota RAV4', carNumber: '678 TUV', status: 'Finished' },
//   { clientName: 'Daniel Walker', carType: 'BMW X3', carNumber: '789 WXY', status: 'On Going' }
// ];


const AdminDashboard = () => {
  const [carData, setCarData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/bookings'); // Accessing the API route
        const data = await response.json(); // Parsing the JSON response
    
        console.log(data); // Log the data to see its structure
    
        if (Array.isArray(data)) {
          setCarData(data); // Only set if it's an array
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

            {/* <div className={styles.sellCarContainer}>
            <div className={styles.cart}>
              <Image src="/cart.png" alt="Sell Icon" width={24} height={24} className={styles.sellIcon} />
            </div>
            <p>We connect you with thousands of potential buyers in your area.</p>
            <button className={styles.sellCarBtn}>Sell Your Car</button>
          </div> */}
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
              <h3>Olivia Deny</h3>
              <p>oliviadeny01@gmail.com</p>
              <button className={styles.editButton}><span>Edit Profile</span></button>
            </div>
          </div>

          {/* Metrics Section */}

          <div className={styles.metrics}>
            <div className='right'>
              <div className={styles.metricCard}>
                <div className={styles.metricText}>
                  <h3>Turnover</h3>
                  <p>$1492.21</p>
                  <span><a className={styles.turnover}>+45</a> from last month</span>
                </div>
                <img src="/turnover.png" alt="Turnover Icon" className={styles.metricImage} />
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricText}>
                  <h3>Income</h3>
                  <p>$7432.53</p>
                  <span><a className={styles.income}>+72</a> from last month</span>
                </div>
                <img src="/income.png" alt="Income Icon" className={styles.metricImage} />
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricText}>
                  <h3>Outcome</h3>
                  <p>$7592.84</p>
                  <span><a className={styles.outcome}>+12</a> from last month</span>
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
