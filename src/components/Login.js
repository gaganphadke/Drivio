import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LoginSignup.module.css';
import Image from 'next/image';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Handle Email/Password login with API call
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Check for admin credentials first
      if (email === 'admin@gmail.com' && password === 'Admin@123') {
        // Set the user type as admin and authentication status as true
        localStorage.setItem('email', email);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'admin');

        console.log('Logged in as admin');
        router.push('/'); // Redirect to home page after successful login
        return; // Exit after successful admin login
      }

      // If it's not admin, proceed to check with the API
      const response = await fetch('/api/checkUserLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.isValidUser) {
        console.log('Login successful');
        // Store the email in localStorage
        localStorage.setItem('email', email);
        console.log('Stored Email:', email); // Log the stored email

        // Set the isAuthenticated flag in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', data.userType);
        router.push('/'); // Redirect to home page after successful login
      } else {
        console.error('Login failed');
        alert('Login failed. Please check your email or password.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };


  // Handle Google login with Firebase only (no DB check)
  const handleGoogleLogin = async () => {
    try {
      const userType = window.confirm('Do you want to sign in as an Owner? Click "OK" for Owner, "Cancel" for Customer.')
        ? 'owner'
        : 'customer';
      const result = await signInWithPopup(auth, provider);
      const googleEmail = result.user.email;


      // Set the userType in localStorage
      localStorage.setItem('email', googleEmail);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', userType);

      // Send user data to the API to save in the appropriate table
      const response = await fetch('/api/googleSignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: googleEmail, userType }),
      });

      if (!response.ok) throw new Error('Failed to save user in database');

      console.log(`Logged in as ${userType}:`, googleEmail);
      router.push('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Google Login Error:', error);
      alert('Google login failed.');
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Login Form</h2>
      <form className={styles.form} onSubmit={handleEmailLogin}>
        <div className={styles.formGroup}>
          <img src="/mail2.png" alt="Email" className={styles.mail} />
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
        <button type="submit" className={styles.submitButton}><span>Login</span></button>
      </form>
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
