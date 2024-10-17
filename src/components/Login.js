import styles from '../styles/LoginSignup.module.css';

const Login = () => {
  return (
    <div>
      <h2 className={styles.title}>Login Form</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <p className={styles.forgotPassword}>Forgot password?</p>
        <button type="submit" className={styles.submitButton}><span>Login</span></button>
      </form>
    </div>
  );
};

export default Login;
