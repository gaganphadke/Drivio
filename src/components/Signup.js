import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/LoginSignup.module.css';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(''); // To store any error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if password meets complexity requirements
    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.');
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please retype.');
      return;
    }

    try {
      // Check if the email already exists
      const response = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (data.exists) {
        setError('This email is already registered.');
      } else {
        // If the email doesn't exist, proceed to profile
        router.push({
          pathname: '/profile',
          query: { email: formData.email, password: formData.password },
        });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Display error if exists */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <img src="/mail2.png" alt="Email" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder=""
            required
          />
          <label>Email Address</label>
        </div>
        <div className={styles.formGroup}>
          <img src="/pass.png" alt="Password" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder=""
            required
          />
          <label>Password</label>
        </div>
        <div className={styles.formGroup}>
          <img src="/pass.png" alt="Confirm Password" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder=""
            required
          />
          <label>Confirm Password</label>
        </div>
        <button type="submit" className={styles.submitButton}>
          <span>Sign Up</span>
        </button>
      </form>
    </div>
  );
};

export default Signup;
