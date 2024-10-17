import React from 'react';
import styles from '../styles/AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <h2>ABOUT CAR</h2>
          <ul>
            <li className={styles.active}>
              <span className={styles.icon}></span>Dashboard
            </li>
            <li>
              <span className={styles.icon}></span>Discover
            </li>
            <li>
              <span className={styles.icon}></span>Calendar
            </li>
            <li>
              <span className={styles.icon}></span>Saved
            </li>
            <li>
              <span className={styles.icon}></span>Inbox
            </li>
          </ul>
        </div>
        <div className={styles.sidebarBottom}>
          <h3>REPORT</h3>
          <ul>
            <li>Transactions</li>
            <li>Car Reports</li>
          </ul>
          <button className={styles.sellCarBtn}>Sell Your Car</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1>Get where you need to go with our service</h1>
          <p>Budget-friendly car rentals for road trips, city visits, and more.</p>
          <button className={styles.exploreButton}>Start Exploring</button>
        </header>

        {/* Car Listings Section */}
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
              <tr>
                <td>1</td>
                <td>Liam Johnson</td>
                <td>Honda Brio</td>
                <td>010 MOR</td>
                <td className={styles.ongoing}>On Going</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Noah Anderson</td>
                <td>Pajero Sport</td>
                <td>696 TON</td>
                <td className={styles.finished}>Finished</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ethan Smith</td>
                <td>Agya</td>
                <td>665 KIT</td>
                <td className={styles.finished}>Finished</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Mason Davis</td>
                <td>N/A</td>
                <td>N/A</td>
                <td className={styles.canceled}>Canceled</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      {/* Right Sidebar (User Profile + Metrics) */}
      <aside className={styles.rightSidebar}>
        {/* Profile Section */}
        <div className={styles.profileCard}>
          <img src="/images/avatar.png" alt="User Profile" className={styles.profileImage} />
          <h3>Olivia Deny</h3>
          <p>oliviadeny01@gmail.com</p>
          <button>Edit Profile</button>
        </div>

        {/* Metrics Section */}
        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <h3>Turnover</h3>
            <p>$1492.21</p>
            <span>+45 from last month</span>
          </div>
          <div className={styles.metricCard}>
            <h3>Income</h3>
            <p>$7432.53</p>
            <span>+72 from last month</span>
          </div>
          <div className={styles.metricCard}>
            <h3>Outcome</h3>
            <p>$7592.84</p>
            <span>+12 from last month</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AdminDashboard;
