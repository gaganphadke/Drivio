// components/PersonalDetailsForm.js

import styles from '../styles/PersonalDetailsForm.module.css';
import React, { useState } from 'react';
import Image from 'next/image';

const PersonalDetailsForm = ({ nextStep, updateFormData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { phone } = formData;
    const phonePattern = /^[0-9+() -]*$/;
    if (!phonePattern.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    updateFormData(formData); // Pass data to parent
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <Image src="/prof.png" alt="Profile Icon" width={24} height={24} className={styles.icon} />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.formInput}
          placeholder=" "
        />
        <label className={styles.formLabel}>Full Name</label>
      </div>
      <div className={styles.formGroup}>
        <Image src="/mail.png" alt="Email Icon" width={24} height={24} className={styles.icon} />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.formInput}
          placeholder=" "
        />
        <label className={styles.formLabel}>Email</label>
      </div>
      <div className={styles.formGroup}>
        <Image src="/phone.png" alt="Phone Icon" width={24} height={24} className={styles.icon} />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9+()-]*"
          inputMode="numeric"
          className={styles.formInput}
          placeholder=" "
          />
        <label className={styles.formLabel}>Phone Number</label>
      </div>
      <button type="submit" className={styles.formButton}>Next</button>
    </form>
  );
};

export default PersonalDetailsForm;
