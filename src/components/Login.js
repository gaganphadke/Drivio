import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebaseConfig';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/LoginSignup.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await axios.post('/api/auth/login-signup', {
        email: user.email,
        uid: user.uid,
      });

      router.push('/'); // Redirect to landing page
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await axios.post('/api/auth/login-signup', {
        email: user.email,
        uid: user.uid,
      });

      router.push('/'); // Redirect to landing page on successful login
    } catch (error) {
      console.error("Error with Google login:", error);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Login Form</h2>
      <form className={styles.form} onSubmit={handleEmailLogin}>
        <div className={styles.formGroup}>
          <img src="/mail2.png" alt="Email" className={styles.mail}/>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email Address</label>
        </div>
        <div className={styles.formGroup}>
          <img src="/pass.png" alt="Password" />
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <a className={styles.forgotPassword}>Forgot password?</a>
        <button type="submit" className={styles.submitButton}><span>Login</span></button>
      </form>
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;