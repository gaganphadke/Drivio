import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';


const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get the user's theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Drivio</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/hotels">Hotel</Link></li>
        <li><Link href="/flights">Flight</Link></li>
        <li><Link href="/trains">Train</Link></li>
        <li><Link href="/travels">Travel</Link></li>
        <li><Link href="/car-rentals">Car Rental</Link></li>
      </ul>
      <div className={styles.rightSection}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <span className={styles.searchButton}>🔍</span>
        <span className={styles.language}>EN</span>
        <Link href="/login" className={styles.loginLink}>Log In</Link>
        <button className={styles.signUpButton}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
