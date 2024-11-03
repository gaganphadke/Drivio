// signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/LoginSignup.module.css';
import Image from 'next/image';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <div>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSignup}>
        <div className={styles.formGroup}>
          <img src="/user.png" alt="Username" />
          <input
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className={styles.formGroup}>
          <img src="/mail2.png" alt="Email" />
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
        <button type="submit" className={styles.submitButton}><span>Sign Up</span></button>
      </form>
    </div>
  );
};

export default Signup;
