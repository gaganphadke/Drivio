// components/PersonalDetailsForm.js

import React, { useState } from 'react';

const PersonalDetailsForm = ({ nextStep }) => {
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
    // Validation can be added here before proceeding
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

export default PersonalDetailsForm;
