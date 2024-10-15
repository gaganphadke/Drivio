import styles from '../styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <p>©2024 Horizon. All rights reserved.</p>
      <nav className={styles.footerNav}>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/support">Support</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
