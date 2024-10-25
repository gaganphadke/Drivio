// components/paymentPage.js

import React, { useState } from 'react';
import Stepper from './Stepper'; // Assuming Stepper.js is in the same folder
import PersonalDetailsForm from './PersonalDetailsForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmation';

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Function to move to the next step
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // Function to move to the previous step
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="payment-page-container">
      <Stepper currentStep={currentStep} />
      
      {currentStep === 1 && (
        <PersonalDetailsForm nextStep={nextStep} />
      )}

      {currentStep === 2 && (
        <PaymentForm nextStep={nextStep} prevStep={prevStep} />
      )}

      {currentStep === 3 && <Confirmation />}
    </div>
  );
};

export default PaymentPage;
