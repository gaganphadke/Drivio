import styles from '../styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p>©2024 DriveIO. All rights reserved.</p>
      <nav className={styles.footerNav}>
        <a href="/policies">Privacy Policy</a>
        <a href="/support">Support</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
