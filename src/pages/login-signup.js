import { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import styles from '../styles/LoginSignup.module.css';
import Navbar from '../components/Navbar-login';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (formType) => {
    setIsLogin(formType);
  };

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Cleanup function to enable scrolling again when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.formContainer}>
        <div className={`${styles.toggleContainer} ${isLogin ? '' : styles.active}`}>
          <div
            className={`${styles.toggleButton} ${isLogin ? styles.active : ''}`}
            onClick={() => toggleForm(true)}
          >
            Login
          </div>
          <div
            className={`${styles.toggleButton} ${!isLogin ? styles.active : ''}`}
            onClick={() => toggleForm(false)}
          >
            Signup
          </div>
          <div
            className={styles.toggleSlider}
            style={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}
          />
        </div>
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default LoginSignup;
