import React, { useState } from 'react';
import styles from '../styles/FooterLanding.module.css';
import Image from 'next/image';
import emailjs from 'emailjs-com';
// import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from './config.js'

const FooterLanding = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent default form submission

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { user_email: email }, EMAILJS_USER_ID)
      .then((response) => {
        setSuccess('Subscription successful! Check your inbox.');
        setEmail('');
      })
      .catch((error) => {
        setError('Failed to send email. Please try again later.');
      });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <Image src="/logo.png" width={140} height={55} alt="DriveIO Logo" />
          <p className={styles.mission}>
            Our mission is to equip modern explorers with cutting-edge, functional, and stylish bags that elevate every adventure.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkColumn}>
            <h3>About</h3>
            <ul>
              <li><a href="/about-us">About Us</a></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3>Support</h3>
            <ul>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h3>Get Updates</h3>
            <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className={styles.subscribeButton}
                type="submit"
              >
                Subscribe
              </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}><Image src="/instagram.png" alt="Instagram" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/twitter.png" alt="Twitter" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/facebook.png" alt="Facebook" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/discord.png" alt="Discord" width={24} height={24} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy;2024 DriveIO. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <a href="/policies">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
