// login.js
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebaseConfig';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js
import styles from '../styles/LoginSignup.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  // Handle Email/Password login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        console.log(userCredential.user);
        router.push('/'); // Redirect to landing page
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        router.push('/'); // Redirect to landing page on successful login
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2 className={styles.title}>Login Form</h2>
      <form className={styles.form} onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className={styles.forgotPassword}>Forgot password?</p>
        <button type="submit" className={styles.submitButton}><span>Login</span></button>
      </form>
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
