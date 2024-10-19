import React from 'react';
import styles from '../styles/FooterLanding.module.css';
import Image from 'next/image';

const FooterLanding = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <Image src="/horizone-logo.png" alt="Horizone Logo" width={30} height={30} />
          <h2 className={styles.brandName}>Horizone</h2>
          <p className={styles.mission}>
            Our mission is to equip modern explorers with cutting-edge, functional, and stylish bags that elevate every adventure.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkColumn}>
            <h3>About</h3>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/career">Career</a></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3>Support</h3>
            <ul>
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/return">Return</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h3>Get Updates</h3>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" className={styles.emailInput} />
              <button className={styles.subscribeButton}>Subscribe</button>
            </div>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}><Image src="/instagram-icon.png" alt="Instagram" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/twitter-icon.png" alt="Twitter" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/discord-icon.png" alt="Discord" width={24} height={24} /></a>
              <a href="#" className={styles.socialIcon}><Image src="/tiktok-icon.png" alt="TikTok" width={24} height={24} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy;2024 Horizone. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;