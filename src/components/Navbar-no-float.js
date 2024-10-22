import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import styles from '../styles/Navbar-no-float.module.css';

import sunIcon from '../assets/sun.png'; // Adjust path as necessary
import moonIcon from '../assets/moon.png'; // Adjust path as necessary
import logo from '../assets/logo.png'; // Import your logo image

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [visible, setVisible] = useState(true); // State to manage navbar visibility
  let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0; // Last scroll position

  const themeIcons = [
    { label: 'Sun', image: sunIcon },
    { label: 'Moon', image: moonIcon }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }

    const handleScroll = () => {
      // Check the scroll direction
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollY) {
          setVisible(false); // Scrolling down
        } else {
          setVisible(true); // Scrolling up
        }
        lastScrollY = scrollY; // Update the last scroll position
      }
    };

    window.addEventListener('scroll', handleScroll); // Attach the scroll event listener

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener on unmount
    };
  }, [lastScrollY]); // Add lastScrollY to dependencies

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  // Define the box shadow based on the current theme
  const buttonShadow = theme === 'dark'
    ? '0 4px 12px rgba(255, 255, 255, 0.5)' // White shadow for dark mode
    : '4px 4px 8px rgba(0, 0, 0, 0.2)'; // Black shadow for light mode

  return (
    <nav className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="Logo" width={140} /> {/* Use the logo image here */}
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/browse">Browse Cars</Link></li>
        <li><Link href="/policies">Rental Policies</Link></li>
        <li><Link href="/deals">Deals & Discounts</Link></li>
        <li><Link href="/feedback">Feedback</Link></li>
      </ul>
      <div className={styles.rightSection}>
        <label className={styles.switch}>
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          <span className={`${styles.slider} ${theme === 'dark' ? styles.darkMode : styles.lightMode}`}>
            <span className={styles.icon}>
              <Image 
                src={theme === 'light' ? sunIcon : moonIcon} 
                alt={theme === 'light' ? themeIcons[0].label : themeIcons[1].label} 
                width={24} // Set the width as needed
                height={24} // Set the height as needed
              />
            </span>
          </span>
        </label>
        <Link 
          href="/login-signup" 
          className={styles.loginButton} 
           // Apply the dynamic box shadow here
          // style={{ boxShadow: buttonShadow }}
        >
          <span>Sign in</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
