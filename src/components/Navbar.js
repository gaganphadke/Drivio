import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Drivio</div>
      <ul className={styles.navLinks}>
        <li><Link href="/">Hotel</Link></li>
        <li><Link href="/">Flight</Link></li>
        <li><Link href="/">Train</Link></li>
        <li><Link href="/">Travel</Link></li>
        <li><Link href="/">Car Rental</Link></li>
      </ul>
      <div className={styles.rightSection}>
        <input
          type="text"
          placeholder="Search destination..."
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>🔍</button>
        <span className={styles.language}>EN</span>
        <Link href="/" className={styles.loginLink}>Log In</Link>
        <button className={styles.signUpButton}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
