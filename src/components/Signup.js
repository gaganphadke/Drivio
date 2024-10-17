import styles from '../styles/LoginSignup.module.css';

const Signup = () => {
  return (
    <div>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className={styles.submitButton}><span>Sign Up</span></button>
      </form>
    </div>
  );
};

export default Signup;
