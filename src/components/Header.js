import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Horizon
      </Link>
      <nav className={styles.nav}>
        <Link href="/flights">Flight</Link>
        <Link href="/train">Train</Link>
        <Link href="/car-rentals">Car Rentals</Link>
      </nav>
      <div className={styles.userControls}>
        <Link href="/login">Log In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  </header>
);

export default Header;
