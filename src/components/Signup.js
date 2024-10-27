import styles from '../styles/LoginSignup.module.css';
import Image from 'next/image';

const Signup = () => {
  return (
    <div>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <img src="/user.png" alt="Username" /> {/* Replace with your username icon path */}
          <input type="text" placeholder="" required />
          <label>Username</label>
        </div>
        <div className={styles.formGroup}>
          <img src="/mail2.png" alt="Email" /> {/* Replace with your email icon path */}
          <input type="email" placeholder="" required />
          <label>Email Address</label>
        </div>
        <div className={styles.formGroup}>
          <img src="/pass.png" alt="Password" /> {/* Replace with your password icon path */}
          <input type="password" placeholder="" required />
          <label>Password</label>
        </div>
        <button type="submit" className={styles.submitButton}><span>Sign Up</span></button>
      </form>
    </div>
  );
};

export default Signup;
