// login-signup.js
import { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import styles from '../styles/LoginSignup.module.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = (formType) => {
    setIsLogin(formType);
  };

  return (
    <div className={styles.container}>
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
