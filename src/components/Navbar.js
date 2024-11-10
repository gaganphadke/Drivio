import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter for page redirection
import styles from '../styles/Navbar.module.css';

import sunIcon from '../assets/sun.png';
import moonIcon from '../assets/moon.png';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Initialize useRouter
  let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }

    // Check if user is logged in on initial load
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        lastScrollY = scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const handleLogin = () => {
    router.push('/login-signup'); // Redirect to login/signup page
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('email', '');
    setIsLoggedIn(false);

    setTimeout(() => {
      router.push('/'); // Redirect to the homepage after logout
    }, 100);
  };

  const handleLinkClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      router.push('/login-signup'); // Redirect to login/signup if not logged in
    } else {
      router.push(path); // Navigate to the link if logged in
    }
  };

  const buttonShadow = theme === 'dark'
    ? '0 4px 12px rgba(255, 255, 255, 0.5)'
    : '4px 4px 8px rgba(0, 0, 0, 0.2)';

  return (
    <nav className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="Logo" width={140} />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/cars" onClick={(e) => handleLinkClick(e, '/cars')}>Browse Cars</Link>
        </li>
        <li>
          <Link href="/policies" onClick={(e) => handleLinkClick(e, '/policies')}>Rental Policies</Link>
        </li>
        <li>
          <Link href="/deals" onClick={(e) => handleLinkClick(e, '/deals')}>Deals & Discounts</Link>
        </li>
        <li>
          <Link href="/feedback" onClick={(e) => handleLinkClick(e, '/feedback')}>Feedback</Link>
        </li>
      </ul>
      <div className={styles.rightSection}>
        <label className={styles.switch}>
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          <span className={`${styles.slider} ${theme === 'dark' ? styles.darkMode : styles.lightMode}`}>
            <span className={styles.icon}>
              <Image
                src={theme === 'light' ? sunIcon : moonIcon}
                alt={theme === 'light' ? 'Sun Icon' : 'Moon Icon'}
                width={24}
                height={24}
              />
            </span>
          </span>
        </label>
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className={styles.loginButton}
          >
            <span>Log out</span>
          </button>
        ) : (
          <button 
            onClick={handleLogin}
            className={styles.loginButton}
          >
            <span>Sign in</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
